import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Mutation, Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import TouchParticipantOnMount from '../components/TouchParticipantOnMount'
import PhotoBooth from '../components/PhotoBooth'
import Participant from '../components/Participant'

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
      {
        participant {
          id
          name
          lastActiveAt
        }

        local @client {
          channel
        }
      }
    `}
  >
    {({ data: { local, participant }, loading }) =>
      loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <Participant participant={participant} />
          <PhotoBooth onFlash={() => console.log('flash')} />
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
