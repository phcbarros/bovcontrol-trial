import {Container, CardTitle, CardContent, Content, Label, Text} from './styles'
import {format} from 'date-fns'
import {ptBR} from 'date-fns/locale/pt-BR'
import {TouchableOpacityProps} from 'react-native'

type Props = TouchableOpacityProps & {
  farmer: string
  farm: string
  city: string
  createdAt: string
}

export function Card({farmer, farm, city, createdAt, ...rest}: Props) {
  return (
    <Container {...rest}>
      <CardTitle>{farmer}</CardTitle>
      <CardContent>
        <Content>
          <Label>Fazenda:</Label>
          <Text>{farm}</Text>
        </Content>

        <Content>
          <Label>Cidade:</Label>
          <Text>{city}</Text>
        </Content>

        <Content>
          <Label>Data:</Label>
          <Text>
            {format(new Date(createdAt), 'dd/MM/yyyy', {
              locale: ptBR,
            })}
          </Text>
        </Content>
      </CardContent>
    </Container>
  )
}
