const clientState = {
  defaults: {
    chatMessages: [],
    name: '',
    message: '',
    channel: 'main'
  },
  resolvers: {
    Mutation: {
      setName: (_, { name }, { cache }) => {
        cache.writeData({
          data: {
            name
          }
        })

        return null
      },
      setMessage: (_, { message }, { cache }) => {
        cache.writeData({
          data: {
            message
          }
        })

        return null
      },
      addChatMessage: (_, { message }, { cache }) => {
        const messages = []

        cache.writeData({
          data: {
            messages: [message, ...messages]
          }
        })

        return null
      }
    }
  }
}

export default clientState
