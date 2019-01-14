import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import { ApolloProvider } from 'react-apollo'
import { client } from './config/apollo'
import JoinChannelMutation from './components/mutations/JoinChannel'
import SendMessageMutation from './components/mutations/SendMessage'
import MessageReceivedSubscription from './components/subscriptions/MessageReceived'

const App = () => (
  <ApolloProvider client={client}>
    <Query
      onCompleted={({ session }) => localStorage.setItem('token', session)}
      query={gql`
        {
          session

          local @client {
            channel
            message
          }
        }
      `}
    >
      {({ data: { session, local }, loading }) =>
        loading ? (
          <div>loading...</div>
        ) : (
          <div>
            session: {session}
            <Mutation
              mutation={gql`
                mutation SetChannel($value: String) {
                  setChannel(value: $value) @client
                }
              `}
            >
              {setChannel => (
                <div>
                  <input
                    type="text"
                    value={local.channel}
                    onChange={({ target: { value } }) =>
                      setChannel({ variables: { value } })
                    }
                  />
                  <JoinChannelMutation>
                    {({ joinChannel, data = {} }) => (
                      <Fragment>
                        <button onClick={() => joinChannel(local.channel)}>
                          join
                        </button>
                        {data.joinChannel && (
                          <div>
                            <p>id: {data.joinChannel.id}</p>
                            <p>name: {data.joinChannel.name}</p>
                            <p>messages: {data.joinChannel.messages.map(({ id, message }) =>
                                (
                                  <div key={id}>
                                    id: {id}, {message}
                                  </div>
                                )
                              )}
                            </p>
                            <div>
                              <MessageReceivedSubscription channelName={data.joinChannel.name}>
                                {({messageReceived}) => messageReceived ? (
                                  <div>message received: {messageReceived.data && messageReceived.data.messageReceived.message}</div>
                                ) : null }
                              </MessageReceivedSubscription>
                              <Mutation
                                mutation={gql`
                                  mutation SetMessage($value: String) {
                                    setMessage(value: $value) @client
                                  }
                                `}
                              >
                                {setMessage => (
                                  <Fragment>
                                    <input
                                      type="text"
                                      value={local.message}
                                      onChange={({ target: { value } }) =>
                                        setMessage({ variables: { value } })
                                      }
                                    />
                                    <SendMessageMutation channel={data.joinChannel.name}>
                                      {
                                        ({ sendMessage }) => (
                                          <button onClick={() => {
                                              sendMessage(local.message)
                                              setMessage({ variables: { value: '' } })
                                            }
                                          }>
                                            send
                                          </button>
                                        )
                                      }
                                    </SendMessageMutation>
                                  </Fragment>
                                )}
                              </Mutation>
                            </div>
                          </div>
                        )}
                      </Fragment>
                    )}
                  </JoinChannelMutation>
                </div>
              )}
            </Mutation>
          </div>
        )
      }
    </Query>
  </ApolloProvider>
)

export default App
