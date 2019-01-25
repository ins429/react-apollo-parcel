import React from 'react'
import gql from 'graphql-tag'
import App from './App'

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
