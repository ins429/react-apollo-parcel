const clientState = {
  defaults: {
    local: {
      __typename: 'Local',
      channel: ''
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
      }
    }
  }
}

export default clientState
