import React from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

export const CHAT_MESSAGE_ADDED = gql`
  subscription ChatMessageAdded($channel: String!) {
    chatMessageAdded(channel: $channel) {
      channel
      name
      message
    }
  }
`

const ChatMessageAdded = ({ children, channel, ...props }) => (
  <Subscription subscription={CHAT_MESSAGE_ADDED} variables={{ channel }}>
    {chatMessageAddedSubscription =>
      children ? children({ ...props, chatMessageAddedSubscription }) : null
    }
  </Subscription>
)

export default ChatMessageAdded
