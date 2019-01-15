import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

export const SET_PARTICIPANT_NAME = gql`
  mutation SetParticipantName($name: String!) {
    setParticipantName(name: $name) {
      id
      name
      lastActiveAt
    }
  }
`

const SetParticipantNameMutation = ({ children, participant }) => (
  <Mutation mutation={SET_PARTICIPANT_NAME}>
    {(mutation, props) =>
      children({
        ...props,
        setParticipantName: name =>
          mutation({
            variables: {
              name
            },
            optimisticResponse: {
              ...participant,
              name
            }
          })
      })
    }
  </Mutation>
)

export default SetParticipantNameMutation
