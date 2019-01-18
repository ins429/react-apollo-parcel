import gql from 'graphql-tag'

export const Participant_participant = gql`
  fragment Participant_participant on Participant {
    id
    name
    avatar
    lastActiveAt
  }
`
