import React from 'react'
import styled from 'styled-components'
import Message from './Message'

const Container = styled.div``

const Dialogue = ({ messages }) => (
  <Container>
    {messages
      .sort((a, b) =>
        new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
          ? 1
          : -1
      )
      .map(({ id, ...messageProps }) => (
        <Message key={id} id={id} {...messageProps} />
      ))}
  </Container>
)

export default Dialogue
