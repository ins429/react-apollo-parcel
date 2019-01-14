import React from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

export const MESSAGE_RECEIVED = gql`
  subscription MessageReceived($channeName: String!) {
    messageReceived(channeName: $channeName) {
      id
      message
    }
  }
`

const MessageReceived = ({ children, channelName, ...props }) => console.log('chan name', channelName) || (
  <Subscription subscription={MESSAGE_RECEIVED} variables={{ channelName }}>
    {messageReceived =>
      children ? children({ ...props, messageReceived }) : null
    }
  </Subscription>
)

export default MessageReceived
