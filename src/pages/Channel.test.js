import React from 'react'
import gql from 'graphql-tag'
import { waitForElement } from 'react-testing-library'
import Channel, { QUERY_CHANNEL } from './Channel'
import { JOIN_CHANNEL } from '../components/mutations/JoinChannel'

const defaultProps = { match: { params: { channelName: 'goodison' } } }

test('renders', async () => {
  const mocks = [
    {
      request: {
        query: JOIN_CHANNEL,
        variables: {
          channelName: 'goodison'
        }
      },
      result: {
        data: {
          joinChannel: {
            id: 1,
            name: 'goodison',
            messages: [],
            participants: []
          }
        }
      }
    },
    {
      request: {
        query: QUERY_CHANNEL,
        variables: {
          channelName: 'goodison'
        }
      },
      result: {
        data: {
          channel: {
            id: 1,
            messages: []
          },
          local: { message: '' }
        }
      }
    },
    {
      request: {
        query: gql`
          {
            participant {
              id
              name
              avatar
              lastActiveAt
            }
          }
        `
      },
      result: {
        data: {
          participant: {
            id: 1,
            name: '',
            avatar: null,
            lastActiveAt: ''
          }
        }
      }
    }
  ]
  const { getByText } = renderWithMockProvider(<Channel {...defaultProps} />, {
    mocks
  })

  expect(getByText('loading...')).toBeInTheDocument()

  await waitForElement(() => getByText('goodison'))
})
