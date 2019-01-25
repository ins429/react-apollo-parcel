import React, { Fragment, useContext, useState } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Avatar from './Avatar'
import PhotoBooth from './PhotoBooth'
import SetParticipantNameMutation from './mutations/SetParticipantName'
import SetParticipantAvatarMutation from './mutations/SetParticipantAvatar'
import useUserMedia from '../utils/useUserMedia'

const EditButton = styled.button`
  position: absolute;
  margin: 0 auto;

  border: none;
  background: none;
  font-size: 0.8rem;
  color: #fff;
  padding: 0.5rem;
  border: 1px solid #fff;
  border-radius: 1rem;
`

const StyledAvatar = styled(Avatar)`
  position: relative;
  margin: 0.25rem auto 1rem;

  &:hover {
    color: #eee;
  }

  ${EditButton} {
    display: none;
  }

  &:hover ${EditButton} {
    display: block;
  }
`

const Container = styled.div`
  padding: 0.5rem;
  margin: 0 auto;
  min-width: 280px;
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
  width: 100%;
  text-align: center;
  outline: none;
`

const Img = styled.img`
  width: 100%;
`

const CamNotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  min-height: 2rem;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  border: 1px dotted #333;
`

const Participant = ({ participant }) => {
  const [editingAvatar, setEditingAvatar] = useState(false)
  const { loading, error, data } = useUserMedia({ audio: true })

  return (
    <Container>
      <Label>your name</Label>
      <StyledAvatar size="4rem">
        {editingAvatar ? (
          <SetParticipantAvatarMutation participant={participant}>
            {({ setParticipantAvatar }) =>
              loading ? (
                <Loader />
              ) : error ? (
                <CamNotFound>camera not found</CamNotFound>
              ) : (
                <PhotoBooth
                  stream={data}
                  onPictureReady={({ data }) => {
                    if (data) {
                      setParticipantAvatar(data)
                      setEditingAvatar(false)
                    }
                  }}
                />
              )
            }
          </SetParticipantAvatarMutation>
        ) : (
          <Fragment>
            {participant.avatar ? (
              <Img src={participant.avatar} alt={participant.name} />
            ) : (
              participant.name[0] || '?'
            )}
            <EditButton onClick={() => setEditingAvatar(true)}>Edit</EditButton>
          </Fragment>
        )}
      </StyledAvatar>
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
}

export default Participant
