import {useNavigation, useRoute} from '@react-navigation/native'
import {Container, Label, Scroll} from './styles'
import {GetChecklistQuery} from '../../infrastructure/api/get-checklist'
import {format} from 'date-fns'
import {ptBR} from 'date-fns/locale/pt-BR'
import {Item} from './Item'
import {Button} from '../../components/Button'

export function Detail() {
  const {params} = useRoute()

  const {navigate} = useNavigation()

  if (!params) {
    return null
  }

  const checklist = params.item as GetChecklistQuery

  function handleUpdate(item: GetChecklistQuery) {
    navigate('updateChecklistForm', {
      item,
    })
  }

  return (
    <Container>
      <Scroll>
        <Item label="Fazendeiro" value={checklist.from.name} />

        <Item label="Tipo" value={checklist.type} />

        <Item
          label="Quantidade de leite produzido"
          value={checklist.amount_of_milk_produced}
        />

        <Item label="Fazenda" value={checklist.farmer.name} />

        <Item label="Cidade" value={checklist.farmer.city} />

        <Item label="Latitude" value={checklist.location.latitude} />

        <Item label="Longitude" value={checklist.location.longitude} />

        <Item label="To" value={checklist.to.name} />

        <Item
          label="Quantidade de cabeças"
          value={checklist.number_of_cows_head}
        />

        <Item
          label="Supervisor"
          value={checklist.had_supervision ? 'Sim' : 'Não'}
        />

        <Item
          label="Data de criação"
          value={format(new Date(checklist.created_at), 'dd/MM/yyyy', {
            locale: ptBR,
          })}
        />

        {checklist.updated_at && (
          <Item
            label="Data de atualização"
            value={format(new Date(checklist.updated_at), 'dd/MM/yyyy', {
              locale: ptBR,
            })}
          />
        )}
      </Scroll>

      <Button title="Atualizar" onPress={() => handleUpdate(checklist)} />
    </Container>
  )
}
