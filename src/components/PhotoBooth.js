import React, { Component, createRef } from 'react'
import styled from 'styled-components'
import Loader from './Loader'

const Container = styled.div`
  padding: 0.5rem;
`

const DisplayContainer = styled.div`
  position: relative;
`

const PreviewContainer = styled.div`
  position: relative;
`

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1rem;
  width: 100%;

  > button {
    display: block;
    margin: 0 auto;
    background: none;
    color: #fff;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
  }
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

const Cam = styled.video`
  width: ${({ width }) => width};
  ${({ hide }) => hide && 'display: none'};
`

const Canvas = styled.canvas`
  ${({ hide }) => hide && 'display: none'};
`

class PhotoBooth extends Component {
  state = {
    loading: true,
    error: false,
    streaming: false,
    height: 0,
    width: 320,
    src: ''
  }
  video = createRef()
  canvas = createRef()

  async componentDidMount() {
    let stream

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
    } catch (err) {
      console.log('An error occurred! ' + err)
      this.setState({ error: true })
    }

    this.setState({ loading: false })
    if (stream !== undefined) {
      this.video.current.srcObject = stream
      this.video.current.play()
      this.addEventListener()
    }
  }

  takePicture() {
    const { canvas, video, clearPhoto } = this
    const { width, height } = this.state
    const { onPictureReady } = this.props

    if (width && height) {
      const context = canvas.current.getContext('2d')

      canvas.current.width = width
      canvas.current.height = height

      context.drawImage(video.current, 0, 0, width, height)

      const data = canvas.current.toDataURL('image/png')

      this.setState({ src: data })
      onPictureReady({ data })
    } else {
      this.clearPhoto()
    }
  }

  clearPhoto() {
    const { canvas } = this

    const context = canvas.current.getContext('2d')
    const data = canvas.current.toDataURL('image/png')

    context.fillStyle = '#AAA'
    context.fillRect(0, 0, canvas.current.width, canvas.current.height)

    this.setState({ src: '' })
  }

  addEventListener() {
    const { video, setState } = this
    const { width, streaming } = this.state

    video.current.addEventListener(
      'canplay',
      e => {
        if (!streaming) {
          const height =
            video.current.videoHeight / (video.current.videoWidth / width)

          this.setState(() => ({
            canvasH: height,
            canvasW: width,
            videoH: height,
            videoW: width,
            streaming: true,
            height
          }))
        }
      },
      false
    )
  }

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <Loader />
        ) : this.state.error ? (
          <CamNotFound>camera not found</CamNotFound>
        ) : (
          <DisplayContainer>
            <Cam
              width={this.state.width}
              ref={this.video}
              hide={!!this.state.src}
            >
              Video stream not available.
            </Cam>
            <Canvas ref={this.canvas} hide={!this.state.src} />
            <ButtonContainer>
              {this.state.src ? (
                <button onClick={this.clearPhoto.bind(this)}>Retake</button>
              ) : (
                <button onClick={this.takePicture.bind(this)}>
                  Take photo
                </button>
              )}
            </ButtonContainer>
          </DisplayContainer>
        )}
      </Container>
    )
  }
}

export default PhotoBooth
