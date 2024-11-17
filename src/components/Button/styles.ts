import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  background-color: ${({disabled, theme}) =>
    disabled ? theme.COLORS.gray : theme.COLORS.purple};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`

export const Title = styled.Text`
  color: #fff;
  font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
`
