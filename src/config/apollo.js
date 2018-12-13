import ApolloClient from 'apollo-boost'
import HttpLink from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import clientState from './clientState'

export const client = new ApolloClient({
  uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
  // uri: 'http://localhost:3003/graphql',
  clientState
})
