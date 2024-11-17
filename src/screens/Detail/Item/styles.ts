import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 10px;
  border-radius: 5px;
  background-color: ${({theme}) => theme.COLORS.backgroundSecondary};
  margin-bottom: 10px;
`

export const Label = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${({theme}) => theme.COLORS.title};
`

export const Value = styled(Label)`
  font-weight: normal;
`
