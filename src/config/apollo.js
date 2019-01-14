import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { hasSubscription } from '@jumpn/utils-graphql'
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import clientState from './clientState'
import absintheSocket from './absintheSocket'

const cache = new InMemoryCache()

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const parseBatchResult = new ApolloLink((operation, forward) =>
  forward(operation).map(({ payload, ...rest }) => ({
    ...payload,
    ...rest
  }))
)

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = ApolloLink.split(
  operation => hasSubscription(operation.query),
  createAbsintheSocketLink(absintheSocket),
  new BatchHttpLink({
    uri: 'http://localhost:3003/graphql'
  })
)

const stateLink = withClientState({
  cache,
  ...clientState
})

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    errorLink,
    parseBatchResult,
    authLink.concat(httpLink)
  ])
})
