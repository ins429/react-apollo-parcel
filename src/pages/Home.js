import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Mutation, Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import TouchParticipantOnMount from '../components/TouchParticipantOnMount'
import SetParticipantAvatarMutation from '../components/mutations/SetParticipantAvatar'
import PhotoBooth from '../components/PhotoBooth'
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
  background: #000;
  display: block;
  margin: 0.5rem auto;
  padding: 0.25rem 0.5rem;
  border-radius: 2rem;

  a {
    color: #fff;
    text-decoration: none;
    &:active {
      color: #fff;
    }
  }
`

const Home = () => (
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
          <SetParticipantAvatarMutation participant={participant}>
            {({ setParticipantAvatar }) => (
              <PhotoBooth
                onPictureReady={({ data }) =>
                  data && setParticipantAvatar(data)
                }
              />
            )}
          </SetParticipantAvatarMutation>
          <TouchParticipantOnMount />
          <Mutation
            mutation={gql`
              mutation SetChannel($value: String) {
                setChannel(value: $value) @client
              }
            `}
          >
            {setChannel => (
              <ChannelForm>
                <Input
                  type="text"
                  value={local.channel}
                  onChange={({ target: { value } }) =>
                    setChannel({ variables: { value } })
                  }
                />
                <Button>
                  <Link to={`/${local.channel.trim()}`}>join</Link>
                </Button>
              </ChannelForm>
            )}
          </Mutation>
        </Container>
      )
    }
  </Query>
)

export default Home
