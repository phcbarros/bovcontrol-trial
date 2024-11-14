import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 10px;
  border-radius: 5px;
  background-color: ${({theme}) => theme.colors.backgroundSecondary};
  margin-bottom: 10px;
`

export const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.title};
`

export const Value = styled(Label)`
  font-weight: normal;
`
