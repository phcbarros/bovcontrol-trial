import {useNavigation, useRoute} from '@react-navigation/native'
import {Container, Label, Scroll} from './styles'
import {GetChecklistQuery} from '../../infrastructure/api/get-checklist'
import {format} from 'date-fns'
import {ptBR} from 'date-fns/locale/pt-BR'
import {Item} from './Item'
import {Button} from '../../components/Button'
import {AppRoutes} from '../../routes/app-routes'
import {View, Text} from 'react-native'
import {Checklist} from '../../types/checklist'

export function Detail() {
  const {params} = useRoute()

  const {navigate} = useNavigation()

  if (!params) {
    return null
  }

  const checklist = params.item as Checklist

  function handleUpdate(item: GetChecklistQuery) {
    navigate(AppRoutes.UpdateChecklist, {
      item,
    })
  }

  return (
    <Container>
      <Scroll>
        <Item label="Fazendeiro" value={checklist.farmer} />

        <Item label="Tipo" value={checklist.type} />

        <Item
          label="Quantidade de leite produzido"
          value={String(checklist.amountOfMilkProduced)}
        />

        <Item label="Fazenda" value={checklist.farm} />

        <Item label="Cidade" value={checklist.city} />

        <Item label="Latitude" value={String(checklist.latitude)} />

        <Item label="Longitude" value={String(checklist.longitude)} />

        <Item label="Supervisor" value={checklist.supervisor} />

        <Item
          label="Quantidade de cabeças"
          value={String(checklist.numberOfCowsHead)}
        />

        <Item
          label="Supervisor"
          value={checklist.hadSupervision ? 'Sim' : 'Não'}
        />

        <Item
          label="Data de criação"
          value={format(new Date(String(checklist.createdAt)), 'dd/MM/yyyy', {
            locale: ptBR,
          })}
        />

        {checklist.updatedAt && (
          <Item
            label="Data de atualização"
            value={format(new Date(String(checklist.updatedAt)), 'dd/MM/yyyy', {
              locale: ptBR,
            })}
          />
        )}
      </Scroll>

      <Button title="Atualizar" onPress={() => handleUpdate(checklist)} />
    </Container>
  )
}
