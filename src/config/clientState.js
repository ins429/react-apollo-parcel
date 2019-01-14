const clientState = {
  defaults: {
    local: {
      __typename: 'Local',
      channel: '',
      message: ''
    }
  },
  resolvers: {
    Mutation: {
      setChannel: (_, { value }, { cache }) => {
        cache.writeData({
          data: {
            local: {
              __typename: 'Local',
              channel: value
            }
          }
        })

        return null
      },
      setMessage: (_, { value }, { cache }) => {
        cache.writeData({
          data: {
            local: {
              __typename: 'Local',
              message: value
            }
          }
        })

        return null
      }
    }
  }
}

export default clientState
