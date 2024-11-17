import {FlatList} from 'react-native'
import styled from 'styled-components/native'

type ChecklistProps = {
  id: number
  farm: string
  city: string
  farmer: string
  createdAt: string
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({theme}) => theme.COLORS.backgroundSecondary};
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
`

export const List = styled(FlatList<ChecklistProps>).attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
  margin-bottom: 20px;
`
