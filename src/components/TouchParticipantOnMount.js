import React from 'react'
import CallOnMount from '../components/CallOnMount'
import TouchParticipantMutation from '../components/mutations/TouchParticipant'

const TouchParticipantOnMount = ({ id }) => (
  <TouchParticipantMutation>
    {({ touchParticipant }) => (
      <CallOnMount fn={() => touchParticipant} id={id || Math.random()} />
    )}
  </TouchParticipantMutation>
)

export default TouchParticipantOnMount
