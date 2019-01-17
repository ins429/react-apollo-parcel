import React from 'react'
import styled from 'styled-components'

const Container = styled.p``

const Message = ({ id, message, participant }) => (
  <Container>
    {participant && participant.name}({id}): {message}
  </Container>
)

export default Message
