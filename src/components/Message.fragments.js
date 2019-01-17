import gql from 'graphql-tag'

export const Message_participant = gql`
  fragment Message_participant on Participant {
    id
    name
  }
`
