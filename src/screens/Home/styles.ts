import {FlatList} from 'react-native'
import styled from 'styled-components/native'
import {Checklist} from '../../types/checklist'

type ChecklistProps = Pick<Checklist, '_id' | 'from' | 'created_at' | 'farmer'>

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
