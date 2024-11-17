import {Container} from './styles'
import {FormProvider, useForm} from 'react-hook-form'
import {RegisterChecklistFormData} from '../../@types/checklist'
import {ChecklistForm} from '../../components/ChecklistForm'
import {Alert, AppRegistry} from 'react-native'
import {
  CreateChecklistBody,
  registerChecklists,
} from '../../infrastructure/api/register-checklist'
import {generateRandomId} from '../../utils/generate-random-id'
import {useMutation} from '@tanstack/react-query'
import {useNavigation} from '@react-navigation/native'
import {AppRoutes} from '../../routes/app-routes'

export function RegisterChecklistForm() {
  const registerChecklistForm = useForm<RegisterChecklistFormData>({
    mode: 'onChange',
  })

  const {mutateAsync: registerChecklistsFn} = useMutation({
    mutationFn: registerChecklists,
  })

  const {navigate} = useNavigation()

  async function handleCreateChecklist(data: RegisterChecklistFormData) {
    try {
      const registerChecklists: CreateChecklistBody = {
        checklists: [
          {
            _id: String(generateRandomId()),
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
          },
        ],
      }

      await registerChecklistsFn(registerChecklists)
      registerChecklistForm.reset()
      Alert.alert('Sucesso', 'Checklist cadastrado com sucesso', [
        {
          text: 'Ok',
          onPress: () => navigate(AppRoutes.Home),
        },
      ])
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar checklist!')
    }
  }

  return (
    <Container>
      <FormProvider {...registerChecklistForm}>
        <ChecklistForm handleOnPress={handleCreateChecklist} />
      </FormProvider>
    </Container>
  )
}
