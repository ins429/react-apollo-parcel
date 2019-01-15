import React, { Component } from 'react'

class CallOnMount extends Component {
  componentDidMount() {
    this.props.fn()
  }

  render() {
    const { children } = this.props

    return children ? children : null
  }
}

export default CallOnMount
