const stopAndRemoveTrack = mediaStream => track => {
  track.stop()
  mediaStream.removeTrack(track)
}

const stopMediaStream = mediaStream =>
  mediaStream &&
  mediaStream.getTracks().forEach(stopAndRemoveTrack(mediaStream))

export default stopMediaStream
