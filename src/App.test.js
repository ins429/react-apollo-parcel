import React from 'react'
import gql from 'graphql-tag'
import { MockedProvider } from 'react-apollo/test-utils'
import { render, waitForElement } from 'react-testing-library'
import App from './App'

// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect'

const renderWithMockProvider = (children, opts = {}) =>
  render(
    <MockedProvider
      mocks={opts.mocks || []}
      addTypename={opts.addTypename || false}
    >
      {children}
    </MockedProvider>
  )

test('renders', () => {
  const { getByText } = renderWithMockProvider(<App />, {
    mocks: [
      {
        request: {
          query: gql`
            {
              session
            }
          `
        },
        result: {
          data: {
            session: 'foo'
          }
        }
      }
    ]
  })

  expect(getByText('loading...')).toBeInTheDocument()
})
