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
  overflow: hidden;
`

const Avatar = ({ children, className, color = '#eee', size = '2rem' }) => (
  <BubbleContainer size={size} color={color} className={className}>
    {children}
  </BubbleContainer>
)

export default Avatar
