import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

export const SUBMIT_INPUT = gql`
  mutation SubmitInput($target: String!, $value: String!) {
    submitInput(target: $target, value: $value) {
      target
      value
    }
  }
`

const SubmitInputMutation = ({ children }) => (
  <Mutation mutation={SUBMIT_INPUT}>
    {(mutation, props) =>
      children({
        ...props,
        submitInput: attrs =>
          mutation({
            variables: attrs
          })
      })
    }
  </Mutation>
)

export default SubmitInputMutation
