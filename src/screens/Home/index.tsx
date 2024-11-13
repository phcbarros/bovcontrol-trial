import {useQuery} from '@tanstack/react-query'
import {
  Card,
  Container,
  List,
  Title,
  CardTitle,
  CardContent,
  Label,
  Content,
} from './styles'
import {Text} from 'react-native'
import {getChecklist} from '../../api/get-check'
import {format} from 'date-fns'
import {ptBR} from 'date-fns/locale/pt-BR'

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
          <Card>
            <CardTitle>{item.from.name}</CardTitle>
            <CardContent>
              <Content>
                <Label>Fazenda:</Label>
                <Text>{item.farmer.name}</Text>
              </Content>

              <Content>
                <Label>Cidade:</Label>
                <Text>{item.farmer.city}</Text>
              </Content>

              <Content>
                <Label>Data:</Label>
                <Text>
                  {format(new Date(item.created_at), 'dd/MM/yyyy', {
                    locale: ptBR,
                  })}
                </Text>
              </Content>
            </CardContent>
          </Card>
        )}
      />
    </Container>
  )
}
