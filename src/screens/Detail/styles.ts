import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  margin: 20px;
  gap: 8px;
  background-color: ${({theme}) => theme.COLORS.backgroundPrimary};
`

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {paddingBottom: 20},
})`
  flex: 1;
`

export const Item = styled.View`
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

export const Text = styled(Label)`
  font-weight: normal;
`
