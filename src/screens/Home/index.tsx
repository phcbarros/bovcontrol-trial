import {useQuery} from '@tanstack/react-query'
import {Container, List} from './styles'
import {
  getChecklist,
  GetChecklistQuery,
} from '../../infrastructure/api/get-checklist'
import {Card} from './Card'
import {useNavigation} from '@react-navigation/native'
import {Button} from '../../components/Button'
import {Title} from '../../components/Title'

export function Home() {
  const {data: checklist} = useQuery({
    queryKey: ['checklist'],
    queryFn: getChecklist,
  })

  const {navigate} = useNavigation()

  function handleOnPress(item: GetChecklistQuery) {
    navigate('detail', {
      item,
    })
  }

  function handlerAddNewChecklist() {
    navigate('registerChecklistForm')
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
      <Button title="Novo Checklist" onPress={handlerAddNewChecklist} />
    </Container>
  )
}
