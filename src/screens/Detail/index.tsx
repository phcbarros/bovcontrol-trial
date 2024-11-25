import {useNavigation, useRoute} from '@react-navigation/native'
import {Container, Label, Scroll} from './styles'
import {format} from 'date-fns'
import {ptBR} from 'date-fns/locale/pt-BR'
import {Item} from './Item'
import {Button} from '../../components/Button'
import {AppRoutes} from '../../routes/app-routes'
import {Checklist} from '../../types/checklist'

export function Detail() {
  const {params} = useRoute()

  const {navigate} = useNavigation()

  if (!params) {
    return null
  }

  const checklist = params.item as Checklist

  function handleUpdate(item: Checklist) {
    navigate(AppRoutes.UpdateChecklist, {
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
          value={String(checklist.amount_of_milk_produced)}
        />

        <Item label="Fazenda" value={checklist.farmer.name} />

        <Item label="Cidade" value={checklist.farmer.city} />

        <Item label="Latitude" value={String(checklist.location.latitude)} />

        <Item label="Longitude" value={String(checklist.location.longitude)} />

        <Item label="Supervisor" value={checklist.to.name} />

        <Item
          label="Quantidade de cabeças"
          value={String(checklist.number_of_cows_head)}
        />

        <Item
          label="Supervisor"
          value={checklist.had_supervision ? 'Sim' : 'Não'}
        />

        <Item
          label="Data de criação"
          value={format(new Date(String(checklist.created_at)), 'dd/MM/yyyy', {
            locale: ptBR,
          })}
        />

        {checklist.updated_at && (
          <Item
            label="Data de atualização"
            value={format(
              new Date(String(checklist.updated_at)),
              'dd/MM/yyyy',
              {
                locale: ptBR,
              },
            )}
          />
        )}
      </Scroll>

      <Button title="Atualizar" onPress={() => handleUpdate(checklist)} />
    </Container>
  )
}
