import {Detail} from '../screens/Detail'
import {Home} from '../screens/Home'

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {ChecklistFormStepOne} from '../screens/register-checklist/RegisterChecklistFormStepOne'
import {RegisterChecklistFormStepTwo} from '../screens/register-checklist/RegisterChecklistFormStepTwo'

const {Navigator, Screen} = createNativeStackNavigator()

export function ChecklistRoutes() {
  return (
    <Navigator screenOptions={{headerShown: true}}>
      <Screen
        name="home"
        component={Home}
        options={{title: 'Checklist', headerShown: false}}
      />
      <Screen name="detail" component={Detail} options={{title: 'Detalhes'}} />
      <Screen
        name="registerChecklistFormStepOne"
        component={ChecklistFormStepOne}
        options={{title: 'Novo Checklist'}}
      />
      <Screen
        name="registerChecklistFormStepTwo"
        component={RegisterChecklistFormStepTwo}
        options={{title: 'Novo Checklist'}}
      />
    </Navigator>
  )
}
