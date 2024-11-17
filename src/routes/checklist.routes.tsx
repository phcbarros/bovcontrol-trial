import {Detail} from '../screens/Detail'
import {Home} from '../screens/Home'

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {RegisterChecklistForm} from '../screens/RegisterChecklistForm'
import {UpdateChecklistForm} from '../screens/UpdateChecklistForm'
import {AppRoutes} from './app-routes'

const {Navigator, Screen, Group} = createNativeStackNavigator()

export function ChecklistRoutes() {
  return (
    <Navigator screenOptions={{headerShown: true}}>
      <Screen
        name={AppRoutes.Home}
        component={Home}
        options={{title: 'Checklist', headerShown: false}}
      />
      <Screen
        name={AppRoutes.Detail}
        component={Detail}
        options={{title: 'Detalhes'}}
      />

      <Screen
        options={{title: 'Novo Checklist'}}
        name={AppRoutes.RegisterChecklist}
        component={RegisterChecklistForm}
      />

      <Screen
        options={{title: 'Atualizar Checklist'}}
        name={AppRoutes.UpdateChecklist}
        component={UpdateChecklistForm}
      />
    </Navigator>
  )
}
