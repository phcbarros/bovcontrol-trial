import {FlatList} from 'react-native'
import styled from 'styled-components/native'

type ChecklistProps = {
  _id: number
  type: string
  amount_of_milk_produced: string
  farmer: {
    name: string
    city: string
  }
  from: {
    name: string
  }
  to: {
    name: string
  }
  number_of_cows_head: string
  had_supervision: true
  location: {
    latitude: string
    longitude: string
  }
  created_at: string
  updated_at: string
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({theme}) => theme.colors.backgroundSecondary};
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
`

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.title};
  margin-top: 20px;
`

export const List = styled(FlatList<ChecklistProps>).attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
  margin-bottom: 20px;
`
