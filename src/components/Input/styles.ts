import styled from 'styled-components/native'

export const Container = styled.View``

export const Group = styled.View`
  width: 100%;
  height: 56px;
  background-color: #fff;
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
  border-right-color: #f4f5f6;
`
export const Control = styled.TextInput`
  flex: 1;
  padding-left: 16px;
  font-size: 16px;
`

export const Error = styled.Text`
  font-size: 14px;
  color: #dc1637;
  margin-top: 8px;
`
