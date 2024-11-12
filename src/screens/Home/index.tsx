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

export function Home() {
  return (
    <Container>
      <Title>Checklist</Title>
      <List
        data={[
          {
            name: 'Fernando Siqueira Assis',
            id: 1,
            city: 'Belo Horizonte',
            farm: 'Fazenda A',
            date: '2023-06-01',
          },
          {
            name: 'Fazendeiro',
            id: 2,
            city: 'Belo Horizonte',
            farm: 'Fazenda A',
            date: '2023-06-01',
          },
          {
            name: 'Fazendeiro',
            id: 3,
            city: 'Belo Horizonte',
            farm: 'Fazenda A',
            date: '2023-06-01',
          },
          {
            name: 'Fazendeiro',
            id: 4,
            city: 'Belo Horizonte',
            farm: 'Fazenda A',
            date: '2023-06-01',
          },
          {
            name: 'Fazendeiro',
            id: 5,
            city: 'Belo Horizonte',
            farm: 'Fazenda A',
            date: '2023-06-01',
          },
          {
            name: 'Fazendeiro',
            id: 6,
            city: 'Belo Horizonte',
            farm: 'Fazenda A',
            date: '2023-06-01',
          },
          {
            name: 'Fazendeiro',
            id: 7,
            city: 'Belo Horizonte',
            farm: 'Fazenda A',
            date: '2023-06-01',
          },
          {
            name: 'Fazendeiro',
            id: 8,
            city: 'Belo Horizonte',
            farm: 'Fazenda A',
            date: '2023-06-01',
          },
          {
            name: 'Fazendeiro',
            id: 9,
            city: 'Belo Horizonte',
            farm: 'Fazenda A',
            date: '2023-06-01',
          },
          {
            name: 'Fazendeiro',
            id: 10,
            city: 'Belo Horizonte',
            farm: 'Fazenda A',
            date: '2023-06-01',
          },
        ]}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => (
          <Card>
            <CardTitle>{item.name}</CardTitle>
            <CardContent>
              <Content>
                <Label>Fazenda</Label>
                <Text>{item.farm}</Text>
              </Content>

              <Content>
                <Label>Cidade:</Label>
                <Text>{item.city}</Text>
              </Content>

              <Content>
                <Label>Data:</Label>
                <Text>{item.date}</Text>
              </Content>
            </CardContent>
          </Card>
        )}
      />
    </Container>
  )
}
