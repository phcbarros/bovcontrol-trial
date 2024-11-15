import {Button, TextInput, Text} from 'react-native'
import {Input} from '../../components/Input'
import {Container, Title} from './styles'
import {Controller, useForm, useFormContext} from 'react-hook-form'
import {useRef} from 'react'
import {z} from 'zod'
import {Switch} from '../../components/Switch'

const checklistTypeEnum = z.enum(['antibiotico', 'antibiótico', 'bpa', 'bcp'])

export function ChecklistFormStepTwo() {
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useFormContext()

  const checklistTypeRef = useRef<TextInput>(null)
  const quantityOfMilkProducedRef = useRef<TextInput>(null)
  const quantityOfCowsHeadRef = useRef<TextInput>(null)

  function handleNextStep(data: any) {
    console.log(data)
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
          onSubmitEditing: () => quantityOfMilkProducedRef.current?.focus(),
          returnKeyType: 'next',
        }}
        error={errors?.checklistType?.message}
      />

      <Input
        ref={quantityOfMilkProducedRef}
        icon="cow"
        formProps={{
          name: 'quantityOfMilkProduced',
          control,
          rules: {
            required: 'Quantidade de leite produzido é obrigatório',
            validate: isValidNumber,
          },
        }}
        inputProps={{
          placeholder: 'Quantidade de leite produzido',
          onSubmitEditing: () => quantityOfCowsHeadRef.current?.focus(),
          keyboardType: 'numeric',
        }}
        error={errors?.quantityOfMilkProduced?.message}
      />

      <Input
        ref={quantityOfCowsHeadRef}
        icon="cow"
        formProps={{
          name: 'quantityOfCowsHead',
          control,
          rules: {
            required: 'Quantidade de cabeça de gado é obrigatório',
            validate: isValidNumber,
          },
        }}
        inputProps={{
          placeholder: 'Quantidade de cabeça de gado',
          onSubmitEditing: handleSubmit(handleNextStep),
          keyboardType: 'numeric',
        }}
        error={errors?.quantityOfCowsHead?.message}
      />

      <Switch
        icon="check"
        formProps={{name: 'hadSupervision', control}}
        error={errors?.hadSupervision?.message}
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </Container>
  )
}
