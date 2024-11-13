import {useQuery} from '@tanstack/react-query'
import {Container, List, Title} from './styles'
import {getChecklist} from '../../api/get-check'
import {Card} from './Card'

export function Home() {
  const {data: checklist} = useQuery({
    queryKey: ['checklist'],
    queryFn: getChecklist,
  })

  return (
    <Container>
      <Title>Checklist</Title>
      <List
        data={checklist}
        keyExtractor={(item) => String(item._id)}
        renderItem={({item}) => (
          <Card
            testID={String(item._id)}
            farmer={item.farmer}
            from={item.from}
            created_at={item.created_at}
          />
        )}
      />
    </Container>
  )
}
