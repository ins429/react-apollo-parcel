import { useEffect } from 'react'
import stopMediaStream from './stopMediaStream'
import usePromise from './usePromise'

const useUserMedia = constraints => {
  const [stream, error] = usePromise(() => {
    return navigator.mediaDevices.getUserMedia(constraints)
  })

  useEffect(() => () => stopMediaStream(stream), [stream])

  return { error, data: stream, loading: !stream }
}

export default useUserMedia
