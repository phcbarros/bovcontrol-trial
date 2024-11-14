import {Detail} from '../screens/Detail'
import {Home} from '../screens/Home'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

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
    </Navigator>
  )
}
