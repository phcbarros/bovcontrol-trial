import {TextInput} from 'react-native'
import {Input} from '../../../components/Input'
import {Container, Title} from './styles'
import {useFormContext} from 'react-hook-form'
import {useRef} from 'react'
import {useNavigation} from '@react-navigation/native'
import {RegisterChecklistFormData} from '../../../@types/checklist'
import {Button} from '../../../components/Button'

export function ChecklistFormStepOne() {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useFormContext<RegisterChecklistFormData>()

  const farmRef = useRef<TextInput>(null)
  const cityRef = useRef<TextInput>(null)
  const latitudeRef = useRef<TextInput>(null)
  const longitudeRef = useRef<TextInput>(null)

  console.log('s', isValid)

  const {navigate} = useNavigation()

  function handleNextStep() {
    navigate('registerChecklistFormStepTwo')
  }

  return (
    <Container>
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
          returnKeyType: 'next',
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
          },
        }}
        inputProps={{
          placeholder: 'Latitude',
          onSubmitEditing: () => longitudeRef.current?.focus(),
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
          },
        }}
        inputProps={{
          placeholder: 'Longitude',
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
        error={errors?.longitude?.message}
      />

      <Button
        title="Continuar"
        onPress={handleSubmit(handleNextStep)}
        disabled={!isValid}
      />
    </Container>
  )
}
