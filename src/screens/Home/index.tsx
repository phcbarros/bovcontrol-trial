import {useQuery} from '@tanstack/react-query'
import {Container, List} from './styles'
import {getChecklist} from '../../infrastructure/api/get-checklist'
import {Card} from './Card'
import {useNavigation} from '@react-navigation/native'
import {Button} from '../../components/Button'
import {Title} from '../../components/Title'
import {AppRoutes} from '../../routes/app-routes'
import {useQueryRealm, useRealm} from '../../libs/realm'
import {ChecklistSchema} from '../../libs/realm/schemas/checklist'
import {useNetInfo} from '@react-native-community/netinfo'
import {useEffect, useState} from 'react'
import {Checklist} from '../../types/checklist'
import {useChecklistContext} from '../../context/checklist-context'

export function Home() {
  const netInfo = useNetInfo()
  const realmData = useQueryRealm(ChecklistSchema)
  const realm = useRealm()
  const {syncChecklists} = useChecklistContext()

  // realm.write(() => {
  //   realm.deleteAll()
  // })

  const [checklist, setChecklist] = useState<Checklist[]>([])

  const {data: checklistData} = useQuery({
    queryKey: ['checklists'],
    queryFn: getChecklist,
    enabled: !!netInfo.isConnected,
    //staleTime: 0,
  })

  const {navigate} = useNavigation()

  function handleOnPress(item: Checklist) {
    navigate('detail', {
      item,
    })
  }

  useEffect(() => {
    if (checklistData) {
      setChecklist([...checklistData.map((item) => ({...item, sync: true}))])
    }

    setChecklist((prev) => [...realmData.sorted('created_at', true), ...prev])
  }, [checklistData, realmData])

  function handlerAddNewChecklist() {
    navigate(AppRoutes.RegisterChecklist)
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
            farm={item.from.name}
            city={item.farmer.city}
            farmer={item.farmer.name}
            createdAt={item.created_at}
            sync={item.sync}
            onPress={() => handleOnPress(item)}
          />
        )}
      />
      <Button title="Novo Checklist" onPress={handlerAddNewChecklist} />
      <Button title="Sincronizar" onPress={syncChecklists} />
    </Container>
  )
}
