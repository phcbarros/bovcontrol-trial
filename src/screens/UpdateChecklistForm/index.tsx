import {Container} from './styles'
import {FormProvider, useForm} from 'react-hook-form'
import {useNavigation, useRoute} from '@react-navigation/native'
import {UpdateChecklistFormData} from '../../@types/checklist'
import {ChecklistForm} from '../../components/ChecklistForm'
import {
  updateChecklist,
  UpdateChecklistBody,
} from '../../infrastructure/api/update-checklist'
import {useMutation, useQuery} from '@tanstack/react-query'
import {Alert, KeyboardAvoidingView, Platform} from 'react-native'
import {AppRoutes} from '../../routes/app-routes'
import {useQueryRealm, useRealm} from '../../libs/realm'
import {useNetInfo} from '@react-native-community/netinfo'
import {ChecklistSchema} from '../../libs/realm/schemas/checklist'
import {queryClient} from '../../libs/react-query'
import {Checklist} from '../../types/checklist'

export function UpdateChecklistForm() {
  const {params} = useRoute()
  const item = params!.item as Checklist
  const checklistFromDB = useQueryRealm(ChecklistSchema, (checklist) => {
    return checklist.filtered('_id = $0', String(item._id))
  })

  const {navigate} = useNavigation()
  const realm = useRealm()
  const netInfo = useNetInfo()

  const updateChecklistForm = useForm<UpdateChecklistFormData>({
    defaultValues: {
      id: item._id,
      farmer: item.from.name,
      city: item.farmer.city,
      farm: item.farmer.name,
      latitude: String(item.location.latitude),
      longitude: String(item.location.longitude),
      supervisor: item.to.name,
      checklistType: item.type,
      amountOfMilkProduced: String(item.amount_of_milk_produced),
      numberOfCowsHead: String(item.number_of_cows_head),
      hadSupervision: item.had_supervision,
    },
    mode: 'onChange',
  })

  const {mutateAsync: updateChecklistFn} = useMutation({
    mutationFn: ({id, checklist}: {id: string; checklist: Checklist}) => {
      return updateChecklist(id, checklist)
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData<Checklist[]>(['checklists'], (oldChecklists) => {
        return oldChecklists?.map((checklist) => {
          if (checklist._id === item._id) {
            return {...variables.checklist, _id: item._id}
          }
          return checklist
        })
      })
    },
  })

  async function handleUpdateChecklist(data: UpdateChecklistFormData) {
    try {
      const updatedChecklist: UpdateChecklistBody = {
        to: {
          name: data.supervisor,
        },
        from: {
          name: data.farmer,
        },
        type: data.checklistType,
        amount_of_milk_produced: Number(data.amountOfMilkProduced),
        number_of_cows_head: Number(data.numberOfCowsHead),
        had_supervision: data.hadSupervision,
        farmer: {
          name: data.farm,
          city: data.city,
        },
        location: {
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      console.log(updatedChecklist, checklistFromDB)

      if (!netInfo.isConnected) {
        await updateChecklistFn({id: item._id, checklist: updatedChecklist})
      } else {
        realm.write(() => {
          realm.create(
            'Checklist',
            ChecklistSchema.generate({
              ...updatedChecklist,
              sync: false,
              _id: String(data.id),
              action:
                checklistFromDB[0]?.action === 'register'
                  ? 'register'
                  : 'update',
            }),
            'modified',
          )
        })
      }

      Alert.alert('Sucesso', 'Checklist atualizado com sucesso.', [
        {
          text: 'OK',
          onPress: () => navigate(AppRoutes.Home),
        },
      ])

      queryClient.invalidateQueries({queryKey: ['checklists']})
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Erro ao atualizar o checklist!')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <Container>
        <FormProvider {...updateChecklistForm}>
          <ChecklistForm handleOnPress={handleUpdateChecklist} />
        </FormProvider>
      </Container>
    </KeyboardAvoidingView>
  )
}
