import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundPrimary};
  padding: 20px;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.title};
  margin-top: 20px;
`
