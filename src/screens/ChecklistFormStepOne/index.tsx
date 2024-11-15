import {Button, TextInput} from 'react-native'
import {Input} from '../../components/Input'
import {Container, Title} from './styles'
import {useFormContext} from 'react-hook-form'
import {useRef} from 'react'
import {useNavigation} from '@react-navigation/native'

export function ChecklistFormStepOne() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useFormContext()
  const farmRef = useRef<TextInput>(null)
  const cityRef = useRef<TextInput>(null)

  const {navigate} = useNavigation()

  function handleNextStep(data: any) {
    navigate('checkListFormStepTwo')
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
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
        error={errors?.city?.message}
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </Container>
  )
}
