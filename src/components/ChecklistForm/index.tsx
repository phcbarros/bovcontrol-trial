import {isValid} from 'date-fns'
import {useRef} from 'react'
import {TextInput} from 'react-native'
import {Button} from '../Button'
import {Input} from '../Input'
import {Title} from '../Title'
import {Container, Form} from './styles'
import {FieldErrors, UseControllerProps, useFormContext} from 'react-hook-form'
import {
  RegisterChecklistFormData,
  UpdateChecklistFormData,
} from '../../@types/checklist'
import {Switch} from '../Switch'
import {z} from 'zod'

type Props = {
  handleOnPress: (
    data: RegisterChecklistFormData | UpdateChecklistFormData,
  ) => Promise<void>
}

const checklistTypeEnum = z.enum(['antibiotico', 'antibiótico', 'bpa', 'bcp'])

export function ChecklistForm({handleOnPress}: Props) {
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors, isValid, isSubmitting},
  } = useFormContext()

  const farmRef = useRef<TextInput>(null)
  const cityRef = useRef<TextInput>(null)
  const latitudeRef = useRef<TextInput>(null)
  const longitudeRef = useRef<TextInput>(null)
  const supervisorRef = useRef<TextInput>(null)
  const checklistTypeRef = useRef<TextInput>(null)
  const amountOfMilkProducedRef = useRef<TextInput>(null)
  const numberOfCowsHeadRef = useRef<TextInput>(null)

  function isValidChecklistType(): boolean | string {
    const {checklistType} = getValues()

    const result = checklistTypeEnum.safeParse(checklistType.toLowerCase())

    if (result.success) {
      return true
    }

    return 'Escolha um tipo de checklist válido (antibiótico, BPA ou BCP)'
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
      <Form>
        <Title>Dados da fazenda</Title>

        <Input
          icon="user"
          formProps={{
            name: 'farmer',
            control,
            rules: {
              required: 'Nome do fazendeiro é obrigatório',
            },
          }}
          inputProps={{
            placeholder: 'Nome do fazendeiro',
            onSubmitEditing: () => farmRef.current?.focus(),
            returnKeyType: 'next',
          }}
          error={errors?.farmer?.message}
        />

        <Input
          ref={farmRef}
          icon="house"
          formProps={{
            name: 'farm',
            control,
            rules: {
              required: 'Nome da fazenda é obrigatório',
            },
          }}
          inputProps={{
            placeholder: 'Nome da fazenda',
            onSubmitEditing: () => cityRef.current?.focus(),
          }}
          error={errors?.farm?.message}
        />

        <Input
          ref={cityRef}
          icon="map"
          formProps={{
            name: 'city',
            control,
            rules: {
              required: 'Cidade é obrigatória',
            },
          }}
          inputProps={{
            placeholder: 'Cidade',
            onSubmitEditing: () => latitudeRef.current?.focus(),
          }}
          error={errors?.city?.message}
        />

        <Input
          ref={latitudeRef}
          icon="map"
          formProps={{
            name: 'latitude',
            control,
            rules: {
              required: 'Latitude é obrigatória',
              validate: isValidNumber,
            },
          }}
          inputProps={{
            placeholder: 'Latitude',
            onSubmitEditing: () => longitudeRef.current?.focus(),
            keyboardType: 'numeric',
          }}
          error={errors?.latitude?.message}
        />

        <Input
          ref={longitudeRef}
          icon="map"
          formProps={{
            name: 'longitude',
            control,
            rules: {
              required: 'Longitude é obrigatória',
              validate: isValidNumber,
            },
          }}
          inputProps={{
            placeholder: 'Longitude',
            onSubmitEditing: () => supervisorRef.current?.focus(),
            keyboardType: 'numeric',
            returnKeyType: 'next',
          }}
          error={errors?.longitude?.message}
        />

        <Title>Itens do checklist</Title>

        <Input
          ref={supervisorRef}
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
          title="Salvar"
          onPress={handleSubmit(handleOnPress)}
          disabled={!isValid || isSubmitting}
        />
      </Form>
    </Container>
  )
}
