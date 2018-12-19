const clientState = {
  defaults: {
    localInput: {
      __typename: 'LocalInput',
      value: ''
    }
  },
  resolvers: {
    Mutation: {
      setLocalInput: (_, { value }, { cache }) => {
        cache.writeData({
          data: {
            localInput: {
              __typename: 'LocalInput',
              value
            }
          }
        })

        return null
      }
    }
  }
}

export default clientState
