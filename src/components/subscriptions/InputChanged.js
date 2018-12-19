import React from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

export const INPUT_CHANGED = gql`
  subscription InputChanged($target: String!) {
    inputChanged(target: $target) {
      value
      target
    }
  }
`

const InputChanged = ({ children, target, ...props }) => (
  <Subscription subscription={INPUT_CHANGED} variables={{ target }}>
    {inputChangedSubscription =>
      children ? children({ ...props, inputChangedSubscription }) : null
    }
  </Subscription>
)

export default InputChanged
