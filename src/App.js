import React from 'react'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import { ApolloProvider } from 'react-apollo'
import { client } from './config/apollo'
import SubmitInputMutation from './components/mutations/SubmitInput'
import InputChangedSubscription from './components/subscriptions/InputChanged'

const App = () => (
  <ApolloProvider client={client}>
    <Query
      query={gql`
        {
          obj {
            id
            field
          }

          string

          localInput @client {
            value
          }
        }
      `}
    >
      {({ data: { localInput = null, obj = null, string = null }, loading }) =>
        loading ? (
          <div>loading...</div>
        ) : (
          <div>
            <div>
              <h3>Data from query</h3>
              <span>obj.id: {obj.id}</span>
              <span>obj.field: {obj.field}</span>
              <span>string: {string}</span>
            </div>
            <SubmitInputMutation>
              {({ submitInput, data = {} }) => (
                <div>
                  <h3>Local input value</h3>
                  <Mutation
                    mutation={gql`
                      mutation setLocalInput($value: String) {
                        setLocalInput(value: $value) @client
                      }
                    `}
                  >
                    {setLocalInput => (
                      <input
                        type="text"
                        value={localInput.value}
                        onChange={({ target: { value } }) =>
                          setLocalInput({
                            variables: {
                              value
                            }
                          })
                        }
                      />
                    )}
                  </Mutation>
                  <button
                    onClick={e =>
                      submitInput({
                        target: 'top',
                        value: localInput.value
                      })
                    }
                  >
                    Submit to remote
                  </button>
                </div>
              )}
            </SubmitInputMutation>
            <InputChangedSubscription target="top">
              {({ inputChangedSubscription }) => (
                <div>
                  <h3>Remote input value(from subscription)</h3>
                  {inputChangedSubscription.data &&
                    inputChangedSubscription.data.inputChanged.value}
                </div>
              )}
            </InputChangedSubscription>
          </div>
        )
      }
    </Query>
  </ApolloProvider>
)

export default App
