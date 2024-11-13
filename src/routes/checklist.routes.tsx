import {Home} from '../screens/Home'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

const {Navigator, Screen} = createNativeStackNavigator()

export function ChecklistRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="home" component={Home} />
    </Navigator>
  )
}
