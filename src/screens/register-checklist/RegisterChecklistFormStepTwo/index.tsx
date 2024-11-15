import {TextInput, Alert} from 'react-native'
import {Input} from '../../../components/Input'
import {Container, Title} from './styles'
import {Controller, useForm, useFormContext} from 'react-hook-form'
import {useRef} from 'react'
import {z} from 'zod'
import {Switch} from '../../../components/Switch'
import {useMutation} from '@tanstack/react-query'
import {
  registerChecklists,
  CreateChecklistBody,
} from '../../../infrastructure/api/register-checklist'
import {RegisterChecklistFormData} from '../../../@types/checklist'
import {generateRandomId} from '../../../utils/generate-random-id'
import {useNavigation} from '@react-navigation/native'
import {Button} from '../../../components/Button'

const checklistTypeEnum = z.enum(['antibiotico', 'antibiótico', 'bpa', 'bcp'])

export function RegisterChecklistFormStepTwo() {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useFormContext<RegisterChecklistFormData>()

  const checklistTypeRef = useRef<TextInput>(null)
  const amountOfMilkProducedRef = useRef<TextInput>(null)
  const numberOfCowsHeadRef = useRef<TextInput>(null)

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
      Alert.alert('Sucesso', 'Checklist cadastrado com sucesso')

      navigate('home')
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar checklist! ')
    }
  }

  function isValidChecklistType(): boolean | string {
    const {checklistType} = getValues()

    const result = checklistTypeEnum.safeParse(checklistType.toLowerCase())

    if (result.success) {
      return true
    }

    return 'Escolha um tipo de checklist válido (antibiótico, bpa ou bcp)'
  }

  function isValidNumber(value: string): boolean | string {
    const result = z.coerce.number().safeParse(value)

    if (result.success) {
      return true
    }

    return 'O valor deve ser um número'
  }

  return (
    <Container>
      <Title>Dados dos animais</Title>

      <Input
        icon="user-check"
        formProps={{
          name: 'supervisor',
          control,
          rules: {
            required: 'Nome do supervisor é obrigatório',
          },
        }}
        inputProps={{
          placeholder: 'Nome do supervisor',
          onSubmitEditing: () => checklistTypeRef.current?.focus(),
          returnKeyType: 'next',
        }}
        error={errors?.supervisor?.message}
      />

      <Input
        ref={checklistTypeRef}
        icon="list"
        formProps={{
          name: 'checklistType',
          control,
          rules: {
            required: 'Tipo de checklist é obrigatório',
            validate: isValidChecklistType,
          },
        }}
        inputProps={{
          placeholder: 'Tipo de checklist',
          onSubmitEditing: () => amountOfMilkProducedRef.current?.focus(),
          returnKeyType: 'next',
        }}
        error={errors?.checklistType?.message}
      />

      <Input
        ref={amountOfMilkProducedRef}
        icon="cow"
        formProps={{
          name: 'amountOfMilkProduced',
          control,
          rules: {
            required: 'Quantidade de leite produzido é obrigatório',
            validate: isValidNumber,
          },
        }}
        inputProps={{
          placeholder: 'Quantidade de leite produzido',
          onSubmitEditing: () => numberOfCowsHeadRef.current?.focus(),
          keyboardType: 'numeric',
        }}
        error={errors?.amountOfMilkProduced?.message}
      />

      <Input
        ref={numberOfCowsHeadRef}
        icon="cow"
        formProps={{
          name: 'numberOfCowsHead',
          control,
          rules: {
            required: 'Quantidade de cabeça de gado é obrigatório',
            validate: isValidNumber,
          },
        }}
        inputProps={{
          placeholder: 'Quantidade de cabeça de gado',
          keyboardType: 'numeric',
        }}
        error={errors?.numberOfCowsHead?.message}
      />

      <Switch
        icon="check"
        formProps={{name: 'hadSupervision', control}}
        error={errors?.hadSupervision?.message}
      />

      <Button
        title="Continuar"
        onPress={handleSubmit(handleCreateChecklist)}
        disabled={!isValid}
      />
    </Container>
  )
}
