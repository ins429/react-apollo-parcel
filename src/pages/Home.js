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

const ChannelForm = styled.form``

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
  outline: none;
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
        <div>
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
                <Link to={`/${local.channel}`}>join</Link>
              </ChannelForm>
            )}
          </Mutation>
        </div>
      )
    }
  </Query>
)

export default Home
