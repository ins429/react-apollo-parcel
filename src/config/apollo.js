import ApolloClient from 'apollo-boost'
import clientState from './clientState'

export const client = new ApolloClient({
  uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
  clientState
})
