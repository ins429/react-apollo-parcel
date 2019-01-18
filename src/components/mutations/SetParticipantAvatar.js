import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Participant_participant } from '../Participant.fragments'

export const SET_PARTICIPANT_AVATAR = gql`
  mutation SetParticipantAvatar($avatar: String!) {
    setParticipantAvatar(avatar: $avatar) {
      id
      name
      avatar
      lastActiveAt
      ...Participant_participant
    }
  }

  ${Participant_participant}
`

const SetParticipantAvatarMutation = ({ children, participant }) => (
  <Mutation mutation={SET_PARTICIPANT_AVATAR}>
    {(mutation, props) =>
      children({
        ...props,
        setParticipantAvatar: avatar =>
          mutation({
            variables: {
              avatar
            },
            optimisticResponse: {
              setParticipantAvatar: {
                ...participant,
                avatar
              }
            }
          })
      })
    }
  </Mutation>
)

export default SetParticipantAvatarMutation
