import styled from 'styled-components/native'

export const Title = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.XXL}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({theme}) => theme.COLORS.title};
  margin-top: 20px;
`
