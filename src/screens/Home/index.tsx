import {useQuery} from '@tanstack/react-query'
import {Container, List, Title} from './styles'
import {getChecklist, GetChecklistQuery} from '../../api/get-check'
import {Card} from './Card'
import {useNavigation} from '@react-navigation/native'

export function Home() {
  const {data: checklist} = useQuery({
    queryKey: ['checklist'],
    queryFn: getChecklist,
  })

  const {navigate} = useNavigation()

  function handleOnPress(item: GetChecklistQuery) {
    console.log('handleOnPress')
    navigate('detail', {
      item,
    })
  }

  return (
    <Container>
      <Title>Checklist</Title>
      <List
        data={checklist}
        keyExtractor={(item) => String(item._id)}
        renderItem={({item}) => (
          <Card
            testID={`card-${String(item._id)}`}
            farmer={item.farmer}
            from={item.from}
            created_at={item.created_at}
            onPress={() => handleOnPress(item)}
          />
        )}
      />
    </Container>
  )
}
