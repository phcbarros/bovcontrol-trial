import {Container} from './styles'
import {FormProvider, useForm} from 'react-hook-form'
import {RegisterChecklistFormData} from '../../@types/checklist'
import {ChecklistForm} from '../../components/ChecklistForm'
import {Alert, KeyboardAvoidingView, Platform} from 'react-native'
import {
  CreateChecklistBody,
  registerChecklists,
} from '../../infrastructure/api/register-checklist'
import {generateRandomId} from '../../utils/generate-random-id'
import {useMutation} from '@tanstack/react-query'
import {useNavigation} from '@react-navigation/native'
import {AppRoutes} from '../../routes/app-routes'
import React from 'react'
import {useRealm} from '../../libs/realm'
import {ChecklistSchema} from '../../libs/realm/schemas/checklist'
import {queryClient} from '../../libs/react-query'
import {useNetInfo} from '@react-native-community/netinfo'

export function RegisterChecklistForm() {
  const {navigate} = useNavigation()
  const realm = useRealm()
  const netInfo = useNetInfo()

  const registerChecklistForm = useForm<RegisterChecklistFormData>({
    defaultValues: {
      amountOfMilkProduced: '1',
      checklistType: 'bpa',
      city: 'Porto Alegre',
      farm: 'Fazenda 1',
      farmer: 'Mutation',
      latitude: '0',
      longitude: '0',
      numberOfCowsHead: '1',
      hadSupervision: false,
      supervisor: 'Supervisor 1',
    },
    mode: 'onChange',
  })

  const {mutateAsync: registerChecklistsFn} = useMutation({
    mutationFn: registerChecklists,
    onSuccess: (data) => {
      updateChecklistOnCache(data)
    },
  })

  function updateChecklistOnCache(newChecklist: CreateChecklistBody) {
    queryClient.setQueryData<GetChecklistQuery[]>(
      ['checklists'],
      (oldChecklists) => [newChecklist.checklists[0], ...(oldChecklists || [])],
    )
  }

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
            had_supervision: data.hadSupervision ? true : false,
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

      if (netInfo.isConnected) {
        await registerChecklistsFn(registerChecklists)
      } else {
        const newChecklist = registerChecklists.checklists[0]

        realm.write(() => {
          realm.create(
            'Checklist',
            ChecklistSchema.generate({...newChecklist, sync: false}),
          )
        })
      }

      registerChecklistForm.reset()
      Alert.alert('Sucesso', 'Checklist cadastrado com sucesso', [
        {
          text: 'Ok',
          onPress: () => navigate(AppRoutes.Home),
        },
      ])
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Erro ao cadastrar checklist!')
    }
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Container>
        <FormProvider {...registerChecklistForm}>
          <ChecklistForm handleOnPress={handleCreateChecklist} />
        </FormProvider>
      </Container>
    </KeyboardAvoidingView>
  )
}
