import React, { Component, createRef } from 'react'
import styled from 'styled-components'
import Message from './Message'

const Container = styled.div`
  padding: 3px;
  overflow-y: scroll;
`

class Dialogue extends Component {
  dialogue = createRef()

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    const { dialogue } = this

    dialogue.current.scrollTop = dialogue.current.scrollHeight
  }

  render() {
    const { messages, currentParticipant } = this.props

    return (
      <Container ref={this.dialogue}>
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
  }
}

export default Dialogue
