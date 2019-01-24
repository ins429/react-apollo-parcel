import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { client } from './config/apollo'
import App from './App'
import GlobalStyle from './GlobalStyle'

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
