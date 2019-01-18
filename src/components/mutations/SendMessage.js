import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

export const SEND_MESSAGE = gql`
  mutation SendMessage($channelName: String!, $message: String!) {
    sendMessage(channelName: $channelName, message: $message) {
      id
      message
    }
  }
`

const SendMessageMutation = ({ children, channel }) => (
  <Mutation mutation={SEND_MESSAGE}>
    {(mutation, props) =>
      children({
        ...props,
        sendMessage: message =>
          mutation({
            variables: {
              channelName: channel,
              message
            },
            optimisticResponse: {
              sendMessage: {
                __typename: 'Message',
                id: 'temp',
                message
              }
            }
          })
      })
    }
  </Mutation>
)

export default SendMessageMutation
