import styled from 'styled-components/native'

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {paddingBottom: 40, justifyContent: 'flex-start'},
})``

export const Form = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.COLORS.backgroundPrimary};
  padding: 20px;
  gap: 16px;
`
