import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  background-color: ${({disabled, theme}) =>
    disabled ? theme.colors.gray : theme.colors.purple};
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`
