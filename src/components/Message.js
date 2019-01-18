import React from 'react'
import styled from 'styled-components'
import Avatar from './Avatar'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ self }) => (self ? 'flex-end' : 'flex-start')};
  padding: 0rem;
  margin-top: 0.25rem;
`

const MessageBubble = styled.p`
  margin: 0.25rem;
  padding: 0.25rem 1rem;
  font-size: 1.1rem;
  line-height: 2rem;
  border: 1px solid #333;
  border-color: #ccc;
  border-radius: 1rem;
`

const MessageBox = styled.div``

const Name = styled.label`
  font-size: 0.8rem;
  padding: 0.25rem;
  font-size: 0.7rem;
  text-align: center;
  color: #aaa;
`

const Message = ({ message, participant, self }) => (
  <Container self={self}>
    <Avatar>{participant.name[0] || '?'}</Avatar>
    <MessageBox>
      <Name>{participant.name}</Name>
      <MessageBubble self={self}>{message}</MessageBubble>
    </MessageBox>
  </Container>
)

export default Message
