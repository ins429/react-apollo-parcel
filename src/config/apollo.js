import ApolloClient from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const link = createHttpLink({
  uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql'
})

export const client = new ApolloClient({
  // link: link,
  uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
  cache: new InMemoryCache(),
})
