import {Detail} from '../screens/Detail'
import {Home} from '../screens/Home'

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {RegisterChecklistForm} from '../screens/RegisterChecklistForm'
import {UpdateChecklistForm} from '../screens/UpdateChecklistForm'

const {Navigator, Screen, Group} = createNativeStackNavigator()

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
        options={{title: 'Novo Checklist'}}
        name="registerChecklistForm"
        component={RegisterChecklistForm}
      />

      <Screen
        options={{title: 'Atualizar Checklist'}}
        name="updateChecklistFormStep"
        component={UpdateChecklistForm}
      />
    </Navigator>
  )
}
