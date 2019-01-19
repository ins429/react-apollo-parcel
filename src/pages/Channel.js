import React, { Fragment } from 'react'
import styled from 'styled-components'
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
import { withLayout } from '../components/Layout'
import { Message_participant } from '../components/Message.fragments'

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`

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

                  ...Message_participant
                }
              }
            }

            local @client {
              message
            }
          }

          ${Message_participant}
        `}
        variables={{ channelName }}
        pollInterval={5000}
      >
        {({ data: { channel, local }, loading, subscribeToMore }) =>
          loading ? (
            <Loader />
          ) : (
            <Container>
              <Query
                query={gql`
                  {
                    participant {
                      id
                      name
                      avatar
                      lastActiveAt
                    }
                  }
                `}
              >
                {({ data: { participant }, loading }) =>
                  loading ? (
                    <Loader />
                  ) : (
                    <Fragment>
                      <Participant participant={participant} />
                      <Dialogue
                        messages={channel.messages}
                        currentParticipant={participant}
                      />
                    </Fragment>
                  )
                }
              </Query>
              <MessageForm channelName={channelName} message={local.message} />

              <MessageReceivedSubscription channelName={channelName} />
              <TouchParticipantOnMount />
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
            </Container>
          )
        }
      </Query>
    )}
  </JoinChannelOnMount>
)

export default withLayout(Channel)
