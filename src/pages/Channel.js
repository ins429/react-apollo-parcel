import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import Participant from '../components/Participant'
import MessageReceivedSubscription, {
  MESSAGE_RECEIVED
} from '../components/subscriptions/MessageReceived'
import CallOnMount from '../components/CallOnMount'
import TouchParticipantOnMount from '../components/TouchParticipantOnMount'
import Dialogue from '../components/Dialogue'
import Loader from '../components/Loader'
import JoinChannelOnMount from '../components/JoinChannelOnMount'
import MessageForm from '../components/MessageForm'

const Channel = ({
  match: {
    params: { channelName }
  }
}) => (
  <JoinChannelOnMount channelName={channelName}>
    {() => (
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
            <Loader />
          ) : (
            <Fragment>
              <Participant />
              <Dialogue messages={channel.messages} />
              <TouchParticipantOnMount />
              <MessageReceivedSubscription channelName={channelName} />
              <MessageForm channelName={channelName} message={local.message} />
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
            </Fragment>
          )
        }
      </Query>
    )}
  </JoinChannelOnMount>
)

export default Channel
