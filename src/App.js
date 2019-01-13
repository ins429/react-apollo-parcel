import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import { ApolloProvider } from 'react-apollo'
import { client } from './config/apollo'
import JoinChannelMutation from './components/mutations/JoinChannel'
import InputChangedSubscription from './components/subscriptions/InputChanged'

const App = () => (
  <ApolloProvider client={client}>
    <Query
      onCompleted={({ session }) => localStorage.setItem('token', session)}
      query={gql`
        {
          session

          local @client {
            channel
          }
        }
      `}
    >
      {({ data: { session, local }, loading }) =>
        loading ? (
          <div>loading...</div>
        ) : (
          <div>
            session: {session}
            <Mutation
              mutation={gql`
                mutation SetChannel($value: String) {
                  setChannel(value: $value) @client
                }
              `}
            >
              {setChannel => (
                <div>
                  <input
                    type="text"
                    value={local.channel}
                    onChange={({ target: { value } }) =>
                      setChannel({ variables: { value } })
                    }
                  />
                  <JoinChannelMutation>
                    {({ joinChannel, data }) => (
                      <Fragment>
                        <button onClick={() => joinChannel(local.channel)}>
                          join
                        </button>
                        data: {data}
                      </Fragment>
                    )}
                  </JoinChannelMutation>
                </div>
              )}
            </Mutation>
          </div>
        )
      }
    </Query>
  </ApolloProvider>
)

export default App
