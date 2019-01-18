import React, { Component, Fragment, createRef } from 'react'

class PhotoBooth extends Component {
  state = { error: false, streaming: false, height: 0, width: 320, src: '' }
  video = createRef()
  canvas = createRef()
  photo = createRef()

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

    if (stream !== undefined) {
      this.video.current.srcObject = stream
      this.video.current.play()
      this.addEventListener()
    }
  }

  takePicture() {
    const { canvas, photo, video, clearPhoto } = this
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
    const { canvas, photo } = this

    const context = canvas.current.getContext('2d')
    const data = canvas.current.toDataURL('image/png')

    context.fillStyle = '#AAA'
    context.fillRect(0, 0, canvas.current.width, canvas.current.height)

    this.setState({ src: data })
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
      <div ref={this.video.current}>
        {this.state.error ? (
          <p>camera not found</p>
        ) : (
          <Fragment>
            <video ref={this.video}>Video stream not available.</video>
            <canvas ref={this.canvas} />
            <img
              ref={this.photo}
              src={this.state.src}
              alt="The screen capture will appear in this box."
            />
            <button onClick={this.takePicture.bind(this)}>Take photo</button>
          </Fragment>
        )}
      </div>
    )
  }
}

export default PhotoBooth
