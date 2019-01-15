import React from 'react'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import JoinChannelMutation from '../components/mutations/JoinChannel'
import SendMessageMutation from '../components/mutations/SendMessage'
import TouchParticipantOnMount from '../components/TouchParticipantOnMount'
import MessageReceivedSubscription from '../components/subscriptions/MessageReceived'
import CallOnMount from '../components/CallOnMount'

const Home = () => (
  <Query
    query={gql`
      {
        local @client {
          channel
        }
      }
    `}
  >
    {({ data: { local }, loading }) =>
      loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <TouchParticipantOnMount />
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
                <Link to={`/${local.channel}`}>join</Link>
              </div>
            )}
          </Mutation>
        </div>
      )
    }
  </Query>
)

export default Home
