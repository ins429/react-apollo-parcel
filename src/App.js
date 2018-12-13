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
      {(updateNetworkStatus) => (
        <Query
          query={gql`
          {
            rates(currency: "USD") {
              currency
              name
              rate
            }

            networkStatus @client {
              isConnected
            }
          }
        `}
      >
        {({ data, loading }) =>
            loading ?
              <div>loading...</div> :
              (
                <div>
                  <button
                    onClick={() => updateNetworkStatus({
                      variables: { isConnected: !data.networkStatus.isConnected }
                    })}
                  >
                    Network is connected? {data.networkStatus.isConnected ? 'yes' : 'no'}
                  </button>
                  {
                    data.rates.map(({ currency, name, rate }) => (
                      <div key={currency}>
                        <span>currency: {currency}</span>
                        <span>name: {name}</span>
                        <span>rate: {rate}</span>
                      </div>
                    ))
                  }
                </div>
              )}
            </Query>
      )}
    </Mutation>
  </ApolloProvider>
)

export default App
