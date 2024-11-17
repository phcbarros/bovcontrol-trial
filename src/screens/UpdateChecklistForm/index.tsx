import {Container} from './styles'
import {FormProvider, useForm, useFormContext} from 'react-hook-form'
import {useNavigation, useRoute} from '@react-navigation/native'
import {UpdateChecklistFormData} from '../../@types/checklist'
import {ChecklistForm} from '../../components/ChecklistForm'
import {GetChecklistQuery} from '../../infrastructure/api/get-checklist'
import {
  updateChecklist,
  UpdateChecklistBody,
} from '../../infrastructure/api/update-checklist'
import {useMutation} from '@tanstack/react-query'
import {Alert} from 'react-native'
import {AppRoutes} from '../../routes/app-routes'

export function UpdateChecklistForm() {
  const {params} = useRoute()

  const item = params.item as GetChecklistQuery

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

  const {navigate} = useNavigation()

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

      await updateChecklistFn({id: data.id, checklist: updatedChecklist})
      Alert.alert('Sucesso', 'Checklist atualizado com sucesso.', [
        {
          text: 'OK',
          onPress: () => navigate(AppRoutes.Home),
        },
      ])

      // todo invalidar cache
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar o checklist!')
    }
  }

  return (
    <Container>
      <FormProvider {...updateChecklistForm}>
        <ChecklistForm handleOnPress={handleUpdateChecklist} />
      </FormProvider>
    </Container>
  )
}
