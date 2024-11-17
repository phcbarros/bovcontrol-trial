import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.COLORS.backgroundSecondary};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Icon = styled.View`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export const CardTitle = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${({theme}) => theme.COLORS.title};
`

export const CardContent = styled.View``

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Label = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
  font-weight: bold;
  color: ${({theme}) => theme.COLORS.text};
`

export const Text = styled(Label)`
  color: ${({theme}) => theme.COLORS.black};
`
