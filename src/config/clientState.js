const clientState = {
  defaults: {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: true
    }
  },
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        console.log('updateNetworkStatus', isConnected)
        cache.writeData({
          data: {
            networkStatus: {
              isConnected
            }
          }
        })

        return null
      }
    }
  }
}

export default clientState
