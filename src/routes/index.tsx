import {NavigationContainer} from '@react-navigation/native'
import {ChecklistRoutes} from './checklist.routes'
import {FormProvider, useForm} from 'react-hook-form'

export function Routes() {
  const methods = useForm()

  return (
    <NavigationContainer>
      <FormProvider {...methods}>
        <ChecklistRoutes />
      </FormProvider>
    </NavigationContainer>
  )
}
