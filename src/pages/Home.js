import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Mutation, Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import TouchParticipantOnMount from '../components/TouchParticipantOnMount'
import Participant from '../components/Participant'
import { Participant_participant } from '../components/Participant.fragments'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ChannelForm = styled.form`
  padding: 0.5rem;
`

const Input = styled.input`
  border-radius: 1rem;
  border: 1px solid #ccc;
  outline: none;
  padding: 0.5rem;
`

const Button = styled.button`
  border: none;
  color: #fff;
  background: #000;
  display: block;
  margin: 0.5rem auto;
  padding: 0.25rem 0.5rem;
  border-radius: 2rem;
`

const Home = ({ history }) => (
  <Query
    query={gql`
      query QueryParticipant {
        participant {
          id
          name
          avatar
          lastActiveAt
          ...Participant_participant
        }

        local @client {
          channel
        }
      }
      ${Participant_participant}
    `}
  >
    {({ data: { local, participant }, loading }) =>
      loading ? (
        <div>loading...</div>
      ) : (
        <Container>
          <Participant participant={participant} />
          <TouchParticipantOnMount />
          <Mutation
            mutation={gql`
              mutation SetChannel($value: String) {
                setChannel(value: $value) @client
              }
            `}
          >
            {setChannel => (
              <ChannelForm
                onSubmit={() => history.push(`/${local.channel.trim()}`)}
              >
                <Input
                  type="text"
                  value={local.channel}
                  onChange={({ target: { value } }) =>
                    setChannel({ variables: { value } })
                  }
                />
                <Button>join</Button>
              </ChannelForm>
            )}
          </Mutation>
        </Container>
      )
    }
  </Query>
)

export default Home
