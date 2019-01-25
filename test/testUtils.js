import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { render } from 'react-testing-library'

global.renderWithMockProvider = (children, opts = {}) =>
  render(
    <MockedProvider
      mocks={opts.mocks || []}
      addTypename={opts.addTypename || false}
    >
      {children}
    </MockedProvider>
  )
