import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 0rem;
  text-align: ${({ self }) => (self ? 'right' : 'left')};
`

const Bubble = styled.p`
  padding: 0.25rem 1rem;
  font-size: 1.1rem;
  line-height: 2rem;
  border: 1px solid #333;
  border-color: ${({ self }) => (self ? '#ccc' : '#333')};
  border-radius: 1rem;
`

const Message = ({ message, participant, self }) => (
  <Container self={self}>
    <Bubble self={self}>
      {self ? message : `${participant.name}: ${message}`}
    </Bubble>
  </Container>
)

export default Message
