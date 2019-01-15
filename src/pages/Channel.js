import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import JoinChannelMutation from '../components/mutations/JoinChannel'
import SendMessageMutation from '../components/mutations/SendMessage'
import Participant from '../components/Participant'
import MessageReceivedSubscription, {
  MESSAGE_RECEIVED
} from '../components/subscriptions/MessageReceived'
import CallOnMount from '../components/CallOnMount'
import TouchParticipantOnMount from '../components/TouchParticipantOnMount'

const Channel = ({
  match: {
    params: { channelName }
  }
}) => (
  <JoinChannelMutation>
    {({ joinChannel, data = {}, loading }) => (
      <CallOnMount fn={() => joinChannel(channelName)}>
        {loading ? (
          <div>loading</div>
        ) : (
          <Query
            query={gql`
              query Channel($channelName: String!) {
                channel(channelName: $channelName) {
                  id
                  messages {
                    id
                    message
                    createdAt

                    participant {
                      name
                    }
                  }
                }

                local @client {
                  message
                }
              }
            `}
            variables={{ channelName }}
            pollInterval={5000}
          >
            {({ data: { channel, local }, loading, subscribeToMore }) =>
              loading ? (
                <div>loading</div>
              ) : (
                <div>
                  <Participant />
                  {channel.messages
                    .sort((a, b) =>
                      new Date(a.createdAt).getTime() >
                      new Date(b.createdAt).getTime()
                        ? 1
                        : -1
                    )
                    .map(({ id, message, participant }) => (
                      <p key={id}>
                        {participant.name}({id}): {message}
                      </p>
                    ))}
                  <TouchParticipantOnMount />
                  <MessageReceivedSubscription channelName={channelName} />
                  <CallOnMount
                    fn={() =>
                      subscribeToMore({
                        document: MESSAGE_RECEIVED,
                        variables: { channelName },
                        updateQuery: (prev, { subscriptionData }) =>
                          subscriptionData.data
                            ? {
                                ...prev,
                                channel: {
                                  ...prev.channel,
                                  messages: [
                                    subscriptionData.data.messageReceived,
                                    ...prev.channel.messages
                                  ]
                                }
                              }
                            : prev
                      })
                    }
                  />
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
                        <SendMessageMutation channel={channelName}>
                          {({ sendMessage }) => (
                            <button
                              onClick={() => {
                                sendMessage(local.message)
                                setMessage({
                                  variables: { value: '' }
                                })
                              }}
                            >
                              send
                            </button>
                          )}
                        </SendMessageMutation>
                      </Fragment>
                    )}
                  </Mutation>
                </div>
              )
            }
          </Query>
        )}
      </CallOnMount>
    )}
  </JoinChannelMutation>
)

export default Channel
