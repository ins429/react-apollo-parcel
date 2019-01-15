import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import SetParticipantNameMutation from '../components/mutations/SetParticipantName'

const Participant = () => (
  <Query
    query={gql`
      {
        participant {
          id
          name
          lastActiveAt
        }
      }
    `}
  >
    {({ data: { participant }, loading }) =>
      loading ? (
        <div>loading...</div>
      ) : (
        <div>
          participant: {JSON.stringify(participant)}
          <SetParticipantNameMutation participant={participant}>
            {({ setParticipantName }) => (
              <div>
                <input
                  type="text"
                  value={participant.name}
                  onChange={({ target: { value } }) =>
                    setParticipantName(value)
                  }
                />
              </div>
            )}
          </SetParticipantNameMutation>
        </div>
      )
    }
  </Query>
)

export default Participant
