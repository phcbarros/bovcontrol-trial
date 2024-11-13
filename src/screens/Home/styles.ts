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
  background-color: ${({theme}) => theme.colors.backgroundSecondary};
  align-items: center;
  justify-content: center;
  gap: 20px;
`

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.title};
  margin-top: 20px;
`

export const List = styled(FlatList<ChecklistProps>).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {paddingBottom: 74},
})`
  width: 100%;
  padding: 0 20px;
`

export const Card = styled.View`
  background-color: ${({theme}) => theme.colors.backgroundPrimary};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`

export const CardTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.title};
`

export const CardContent = styled.View``

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text};
`

export const Text = styled(Label)`
  color: ${({theme}) => theme.colors.textDetail};
`
