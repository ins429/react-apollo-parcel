import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/Home'
import ChannelPage from './pages/Channel'

const App = () => (
  <Query
    onCompleted={({ session }) => localStorage.setItem('token', session)}
    query={gql`
      {
        session
      }
    `}
  >
    {({ loading }) =>
      loading ? (
        <div>loading...</div>
      ) : (
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/:channelName" component={ChannelPage} />
          </Switch>
        </Router>
      )
    }
  </Query>
)

export default App
