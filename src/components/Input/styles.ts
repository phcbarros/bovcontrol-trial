import styled from 'styled-components/native'

export const Container = styled.View``

export const Group = styled.View`
  width: 100%;
  height: 56px;
  background-color: ${({theme}) => theme.COLORS.white};
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`

export const Icon = styled.View`
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-right-width: 3px;
  border-right-color: ${({theme}) => theme.COLORS.backgroundPrimary};
`
export const Control = styled.TextInput`
  flex: 1;
  padding-left: 16px;
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
`

export const Error = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  color: ${({theme}) => theme.COLORS.error};
  margin-top: 8px;
`
