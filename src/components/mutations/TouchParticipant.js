import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

export const TOUCH_PARTICIPANT = gql`
  mutation TouchParticipant {
    touchParticipant {
      id
      last_active_at
    }
  }
`

const TouchParticipantMutation = ({ children, channel }) => (
  <Mutation mutation={TOUCH_PARTICIPANT}>
    {(mutation, props) =>
      children({
        ...props,
        touchParticipant: () => mutation()
      })
    }
  </Mutation>
)

export default TouchParticipantMutation
