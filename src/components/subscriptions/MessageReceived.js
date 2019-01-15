import React from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

export const MESSAGE_RECEIVED = gql`
  subscription MessageReceived($channelName: String!) {
    messageReceived(channelName: $channelName) {
      id
      message
      createdAt
      participant {
        name
      }
    }
  }
`

const MessageReceived = ({ children, channelName, ...props }) => (
  <Subscription subscription={MESSAGE_RECEIVED} variables={{ channelName }}>
    {messageReceived =>
      children ? children({ ...props, messageReceived }) : null
    }
  </Subscription>
)

export default MessageReceived
