import {NavigationContainer} from '@react-navigation/native'
import {ChecklistRoutes} from './checklist.routes'

export function Routes() {
  return (
    <NavigationContainer>
      <ChecklistRoutes />
    </NavigationContainer>
  )
}
