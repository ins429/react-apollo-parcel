import React from 'react'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import { ApolloProvider } from 'react-apollo'
import { client } from './config/apollo'
import SendChatMessageMutation from './components/mutations/SendChatMessage'
import ChatMessageAddedSubscription, {
  CHAT_MESSAGE_ADDED
} from './components/subscriptions/ChatMessageAdded'
import SubscribeToMore from './components/SubscribeToMore'

const App = () => (
  <ApolloProvider client={client}>
    <Query
      query={gql`
        {
          name @client
          channel @client
          message @client
        }
      `}
    >
      {({
        data: { name, channel, message, obj = null, string = null },
        loading
      }) =>
        loading ? (
          <div>loading...</div>
        ) : (
          <div>
            <ChatMessageAddedSubscription channel={channel} />
            <Mutation
              mutation={gql`
                mutation setName($name: String) {
                  setName(name: $name) @client
                }
              `}
            >
              {setName => (
                <div>
                  Name:
                  <input
                    type="text"
                    value={name}
                    onChange={({ target: { value } }) =>
                      setName({
                        variables: {
                          name: value
                        }
                      })
                    }
                  />
                </div>
              )}
            </Mutation>
            <Query
              query={gql`
                {
                  chatMessages @client
                }
              `}
            >
              {({ data: { chatMessages = [] }, subscribeToMore }) => (
                <SubscribeToMore
                  subscribeToMore={() =>
                    subscribeToMore({
                      document: CHAT_MESSAGE_ADDED,
                      variables: { channel },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev

                        const chatMessage =
                          subscriptionData.data.chatMessageAdded

                        return {
                          ...prev,
                          chatMessages: [chatMessage, ...prev.chatMessages]
                        }
                      }
                    })
                  }
                >
                  {chatMessages.length ? (
                    chatMessages
                      .map(chatMessage => (
                        <p>
                          <span>{chatMessage.name}: </span>
                          {chatMessage.message}
                        </p>
                      ))
                      .reverse()
                  ) : (
                    <p>
                      <i>No chats available</i>
                    </p>
                  )}
                </SubscribeToMore>
              )}
            </Query>
            <SendChatMessageMutation>
              {({ sendChatMessage, data = {} }) => (
                <div>
                  <Mutation
                    mutation={gql`
                      mutation setMessage($message: String) {
                        setMessage(message: $message) @client
                      }
                    `}
                  >
                    {setMessage => (
                      <div>
                        Message:
                        <input
                          type="text"
                          value={message}
                          onChange={({ target: { value } }) =>
                            setMessage({
                              variables: {
                                message: value
                              }
                            })
                          }
                        />
                        <button
                          onClick={e => {
                            sendChatMessage({
                              name,
                              channel,
                              message
                            })
                            setMessage({
                              variables: {
                                message: ''
                              }
                            })
                          }}
                        >
                          Send
                        </button>
                      </div>
                    )}
                  </Mutation>
                </div>
              )}
            </SendChatMessageMutation>
          </div>
        )
      }
    </Query>
  </ApolloProvider>
)

export default App
