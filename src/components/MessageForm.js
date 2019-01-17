import React from 'react'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import SendMessageMutation from './mutations/SendMessage'

const MessageForm = ({ channelName, message }) => (
  <Mutation
    mutation={gql`
      mutation SetMessage($value: String) {
        setMessage(value: $value) @client
      }
    `}
  >
    {setMessage => (
      <SendMessageMutation channel={channelName}>
        {({ sendMessage }) => (
          <form
            onSubmit={e => {
              e.preventDefault()

              if (!message.trim()) return

              sendMessage(message.trim())
              setMessage({
                variables: { value: '' }
              })
            }}
          >
            <input
              type="text"
              value={message}
              onChange={({ target: { value } }) => {
                setMessage({ variables: { value } })
              }}
            />
            <button>send</button>
          </form>
        )}
      </SendMessageMutation>
    )}
  </Mutation>
)

export default MessageForm
