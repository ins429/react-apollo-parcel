import ApolloClient from 'apollo-boost'
import clientState from './clientState'

export const client = new ApolloClient({
  uri: 'http://localhost:3003/graphql',
  clientState
})
