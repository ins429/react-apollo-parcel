import React from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'
import { Message_participant } from '../Message.fragments'

export const MESSAGE_RECEIVED = gql`
  subscription MessageReceived($channelName: String!) {
    messageReceived(channelName: $channelName) {
      id
      message
      createdAt
      participant {
        name

        ...Message_participant
      }
    }
  }

  ${Message_participant}
`

const MessageReceived = ({ children, channelName, ...props }) => (
  <Subscription subscription={MESSAGE_RECEIVED} variables={{ channelName }}>
    {messageReceived =>
      children ? children({ ...props, messageReceived }) : null
    }
  </Subscription>
)

export default MessageReceived
