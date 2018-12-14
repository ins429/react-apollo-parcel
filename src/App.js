import React from 'react'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import { ApolloProvider } from 'react-apollo'
import { client } from './config/apollo'

const App = () => (
  <ApolloProvider client={client}>
    <Mutation
      mutation={gql`
        mutation updateNetworkStatus($isConnected: Boolean) {
          updateNetworkStatus(isConnected: $isConnected) @client
        }
      `}
    >
      {updateNetworkStatus => (
        <Query
          query={gql`
            {
              obj {
                id
                field
              }

              string

              networkStatus @client {
                isConnected
              }
            }
          `}
        >
          {({ data, loading }) =>
            loading ? (
              <div>loading...</div>
            ) : (
              <div>
                <button
                  onClick={() =>
                    updateNetworkStatus({
                      variables: {
                        isConnected: !data.networkStatus.isConnected
                      }
                    })
                  }
                >
                  Network is connected?{' '}
                  {data.networkStatus.isConnected ? 'yes' : 'no'}
                </button>
                <div>
                  <span>data.obj.id: {data.obj.id}</span>
                  <span>data.obj.field: {data.obj.field}</span>
                  <span>data.string: {data.string}</span>
                </div>
              </div>
            )
          }
        </Query>
      )}
    </Mutation>
  </ApolloProvider>
)

export default App
