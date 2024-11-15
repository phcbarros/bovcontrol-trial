import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
`

export const Group = styled.View`
  width: 100%;
  height: 56px;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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

export const Control = styled.Switch.attrs({
  thumbColor: '#fff',
  trackColor: {true: '#8257e5', false: '#fff'},
})`
  padding-left: 16px;
`

export const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: bold;
`
