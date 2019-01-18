import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import SendIcon from './icons/Send'
import SendMessageMutation from './mutations/SendMessage'

const Form = styled.form`
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 1rem;
`

const Input = styled.input`
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border-radius: 3rem;
  border: 1px solid #aaa;
  outline: none;

  &:focus {
    border: 1px solid #111;
  }
`

const Button = styled.button`
  border: none;
  background: none;
`

const IconWrapper = styled.div`
  min-width: 2rem;
`

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
          <Form
            onSubmit={e => {
              e.preventDefault()

              if (!message.trim()) return

              sendMessage(message.trim())
              setMessage({
                variables: { value: '' }
              })
            }}
          >
            <Input
              type="text"
              value={message}
              onChange={({ target: { value } }) => {
                setMessage({ variables: { value } })
              }}
            />
            <Button>
              <IconWrapper>
                <SendIcon />
              </IconWrapper>
            </Button>
          </Form>
        )}
      </SendMessageMutation>
    )}
  </Mutation>
)

export default MessageForm
