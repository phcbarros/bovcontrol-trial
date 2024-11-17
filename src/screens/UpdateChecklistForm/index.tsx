import {Container} from './styles'
import {FormProvider, useForm, useFormContext} from 'react-hook-form'
import {useNavigation, useRoute} from '@react-navigation/native'
import {UpdateChecklistFormData} from '../../@types/checklist'
import {ChecklistForm} from '../../components/ChecklistForm'
import {
  updateChecklist,
  UpdateChecklistBody,
} from '../../infrastructure/api/update-checklist'
import {useMutation} from '@tanstack/react-query'
import {Alert, KeyboardAvoidingView, Platform} from 'react-native'
import {AppRoutes} from '../../routes/app-routes'
import {useRealm} from '../../libs/realm'
import {useNetInfo} from '@react-native-community/netinfo'
import {ChecklistSchema} from '../../libs/realm/schemas/checklist'
import {queryClient} from '../../libs/react-query'
import {Checklist} from '../../types/checklist'

export function UpdateChecklistForm() {
  const {params} = useRoute()
  const item = params.item as Checklist

  const {navigate} = useNavigation()

  const realm = useRealm()
  const netInfo = useNetInfo()

  const updateChecklistForm = useForm<UpdateChecklistFormData>({
    defaultValues: {
      id: item.id,
      farmer: item.farmer,
      city: item.city,
      farm: item.farm,
      latitude: String(item.latitude),
      longitude: String(item.longitude),
      supervisor: item.supervisor,
      checklistType: item.type,
      amountOfMilkProduced: String(item.amountOfMilkProduced),
      numberOfCowsHead: String(item.numberOfCowsHead),
      hadSupervision: item.hadSupervision,
    },
    mode: 'onChange',
  })

  const {mutateAsync: updateChecklistFn} = useMutation({
    mutationFn: ({
      id,
      checklist,
    }: {
      id: string
      checklist: UpdateChecklistBody
    }) => {
      return updateChecklist(id, checklist)
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['checklists'], (oldChecklists) => {
        return oldChecklists?.map((checklist) => {
          if (checklist._id === item.id) {
            return variables.checklist
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

      if (netInfo.isConnected) {
        await updateChecklistFn({id: data.id, checklist: updatedChecklist})
      } else {
        realm.write(() => {
          realm.create(
            'Checklist',
            ChecklistSchema.generate({
              ...updatedChecklist,
              sync: false,
              _id: data.id,
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

      // todo invalidar cache
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
