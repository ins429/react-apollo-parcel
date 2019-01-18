import React from 'react'
import styled from 'styled-components'
import Message from './Message'

const Container = styled.div`
  padding: 3px;
`

const Dialogue = ({ messages, currentParticipant }) => (
  <Container>
    {messages
      .sort((a, b) =>
        new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
          ? 1
          : -1
      )
      .map(({ id, participant: p, ...messageProps }) => (
        <Message
          key={id}
          id={id}
          self={p.id === currentParticipant.id}
          participant={p}
          {...messageProps}
        />
      ))}
  </Container>
)

export default Dialogue
