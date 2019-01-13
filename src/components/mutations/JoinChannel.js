import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

export const JOIN_CHANNEL = gql`
  mutation JoinChannel($channelName: String!) {
    joinChannel(channelName: $channelName) {
      id
      name
    }
  }
`

const JoinChannelMutation = ({ children }) => (
  <Mutation mutation={JOIN_CHANNEL}>
    {(mutation, props) =>
      children({
        ...props,
        joinChannel: channelName =>
          mutation({
            variables: {
              channelName
            }
          })
      })
    }
  </Mutation>
)

export default JoinChannelMutation
