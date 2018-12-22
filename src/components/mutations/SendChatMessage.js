import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

export const SEND_CHAT_MESSAGE = gql`
  mutation SendChatMessage(
    $name: String!
    $channel: String!
    $message: String!
  ) {
    sendChatMessage(name: $name, channel: $channel, message: $message) {
      name
      channel
      message
    }
  }
`

const SendChatMessageMutation = ({ children }) => (
  <Mutation mutation={SEND_CHAT_MESSAGE}>
    {(mutation, props) =>
      children({
        ...props,
        sendChatMessage: attrs =>
          mutation({
            variables: attrs
          })
      })
    }
  </Mutation>
)

export default SendChatMessageMutation
