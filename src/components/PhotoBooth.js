import React, { Component, Fragment, createRef } from 'react'

class PhotoBooth extends Component {
  state = { error: false, streaming: false, height: 0, width: 320 }
  video = createRef()
  canvas = createRef()

  async componentDidMount() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
    } catch (err) {
      console.log('An error occurred! ' + err)
      this.setState({ error: true })
    }

    if (typeof stream !== 'undefined') {
      this.video.srcObject = stream
      this.video.play()
    }
  }

  takepicture() {
    const { canvas, video } = this
    const { width, height } = this.state

    if (width && height) {
      const context = canvas.getContext('2d')
      const data = canvas.toDataURL('image/png')

      canvas.width = width
      canvas.height = height

      context.drawImage(video, 0, 0, width, height)

      this.photo.setAttribute('src', data)
    } else {
      clearphoto()
    }
  }

  clearphoto() {
    const { canvas } = this
    const context = canvas.getContext('2d')
    const data = canvas.toDataURL('image/png')

    context.fillStyle = '#AAA'
    context.fillRect(0, 0, canvas.width, canvas.height)

    this.photo.setAttribute('src', data)
  }

  addEventListener() {
    const { onFlash } = this.props
    this.video.addEventListener(
      'canplay',
      e => {
        if (!streaming) {
          const { canvas, video } = this
          const { width } = this.state
          const height = video.videoHeight / (video.videoWidth / width)

          this.canvas.setAttribute('width', width)
          this.canvas.setAttribute('height', height)
          this.video.setAttribute('width', width)
          this.video.setAttribute('height', height)

          this.setState({ streaming: true, height })
        }
        onFlash(e)
      },
      false
    )
  }

  render() {
    return (
      <div ref={this.video}>
        {this.state.error ? (
          <p>camera not found</p>
        ) : (
          <Fragment>
            <video ref={this.video}>Video stream not available.</video>
            <canvas ref={this.canvas} />
            <img
              ref={this.photo}
              alt="The screen capture will appear in this box."
            />
            <button id="startbutton">Take photo</button>
          </Fragment>
        )}
      </div>
    )
  }
}

export default PhotoBooth
