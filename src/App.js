import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { ApolloProvider } from 'react-apollo'
import { client } from './config/apollo'

const App = () => (
  <ApolloProvider client={client}>
    <Query
      query={gql`
        {
          rates(currency: "USD") {
            currency
            name
            rate
          }
        }
      `}
    >
      {({ data, loading }) =>
          loading ?
            <div>loading...</div> :
            data.rates.map(({ currency, name, rate }) => (
              <div key={currency}>
                <span>currency: {currency}</span>
                <span>name: {name}</span>
                <span>rate: {rate}</span>
              </div>
            ))
      }
    </Query>
  </ApolloProvider>
)

export default App
