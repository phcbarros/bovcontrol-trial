import {Detail} from '../screens/Detail'
import {Home} from '../screens/Home'

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {ChecklistFormStepOne} from '../screens/ChecklistFormStepOne'
import {ChecklistFormStepTwo} from '../screens/ChecklistFormStepTwo'

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
        name="checkListFormStepOne"
        component={ChecklistFormStepOne}
        options={{title: 'Novo Checklist'}}
      />
      <Screen
        name="checkListFormStepTwo"
        component={ChecklistFormStepTwo}
        options={{title: 'Novo Checklist'}}
      />
    </Navigator>
  )
}
