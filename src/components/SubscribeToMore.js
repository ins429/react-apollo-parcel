import React, { Component } from 'react'

class SubscribeToMore extends Component {
  componentDidMount() {
    this.props.subscribeToMore()
  }

  render() {
    return this.props.children
  }
}

export default SubscribeToMore
