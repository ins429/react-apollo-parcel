import React, { Fragment } from 'react'
import Loader from '../components/Loader'
import CallOnMount from '../components/CallOnMount'
import JoinChannelMutation from '../components/mutations/JoinChannel'

const JoinChannelOnMount = ({ children, channelName, ...props }) => (
  <JoinChannelMutation>
    {({ joinChannel, data = {}, loading }) => (
      <CallOnMount fn={() => joinChannel(channelName)}>
        {loading ? (
          <Loader />
        ) : (
          children({
            props,
            data,
            joinChannel
          })
        )}
      </CallOnMount>
    )}
  </JoinChannelMutation>
)

export default JoinChannelOnMount
