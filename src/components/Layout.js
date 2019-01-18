import React from 'react'
import styled from 'styled-components'

const AppContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
`

const Layout = ({ children }) => <AppContainer>{children}</AppContainer>

export const withLayout = Component => props => (
  <Layout>
    <Component {...props} />
  </Layout>
)

export default Layout
