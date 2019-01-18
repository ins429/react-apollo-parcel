import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import SetParticipantNameMutation from './mutations/SetParticipantName'
import Loader from './Loader'

const Container = styled.div`
  padding: 0.5rem;
  margin: 0 auto;
`

const Label = styled.div`
  padding: 0.25rem;
  font-size: 0.7rem;
  text-align: center;
  color: #aaa;
`

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
  outline: none;
`

const Participant = ({ participant }) => (
  <Container>
    <Label>your name</Label>
    <SetParticipantNameMutation participant={participant}>
      {({ setParticipantName }) => (
        <Input
          type="text"
          value={participant.name}
          onChange={({ target: { value } }) => setParticipantName(value)}
        />
      )}
    </SetParticipantNameMutation>
  </Container>
)

export default Participant