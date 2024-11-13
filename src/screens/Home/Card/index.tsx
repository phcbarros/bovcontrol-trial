import {Container, CardTitle, CardContent, Content, Label, Text} from './styles'
import {format} from 'date-fns'
import {ptBR} from 'date-fns/locale/pt-BR'
import {TouchableOpacityProps} from 'react-native'

type Props = TouchableOpacityProps & {
  farmer: {
    name: string
    city: string
  }
  from: {
    name: string
  }
  created_at: string
}

export function Card({from, farmer, created_at}: Props) {
  return (
    <Container>
      <CardTitle>{from.name}</CardTitle>
      <CardContent>
        <Content>
          <Label>Fazenda:</Label>
          <Text>{farmer.name}</Text>
        </Content>

        <Content>
          <Label>Cidade:</Label>
          <Text>{farmer.city}</Text>
        </Content>

        <Content>
          <Label>Data:</Label>
          <Text>
            {format(new Date(created_at), 'dd/MM/yyyy', {
              locale: ptBR,
            })}
          </Text>
        </Content>
      </CardContent>
    </Container>
  )
}
