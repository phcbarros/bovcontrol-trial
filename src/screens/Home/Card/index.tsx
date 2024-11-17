import {
  Container,
  CardTitle,
  CardContent,
  Content,
  Label,
  Text,
  TitleContainer,
  Icon,
} from './styles'
import {format} from 'date-fns'
import {ptBR} from 'date-fns/locale/pt-BR'
import {TouchableOpacityProps} from 'react-native'
import {FontAwesome6} from '@expo/vector-icons'
import theme from '../../../styles/theme'

type Props = TouchableOpacityProps & {
  farmer: string
  farm: string
  city: string
  createdAt: string
  sync?: boolean
}

export function Card({farmer, farm, city, createdAt, sync, ...rest}: Props) {
  return (
    <Container {...rest}>
      <TitleContainer>
        <CardTitle>{farmer}</CardTitle>
        <Icon>
          <FontAwesome6
            name={sync ? 'check' : 'clock'}
            size={16}
            color={theme.COLORS.success}
          />
        </Icon>
      </TitleContainer>
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
