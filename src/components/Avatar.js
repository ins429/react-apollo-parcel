import React from 'react'
import styled from 'styled-components'

const BubbleContainer = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background: ${({ color }) => color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div``

const Avatar = ({ children, color = '#eee', size = '2rem' }) => (
  <BubbleContainer size={size} color={color}>
    {children}
  </BubbleContainer>
)

export default Avatar
