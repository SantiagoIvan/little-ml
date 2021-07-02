import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserList from './screens/UserList';
import UserDetails from './screens/UserDetails';
import CreateUser from './screens/CreateUser';

const Stack = createStackNavigator(); /** Me devuelve un componente */

function MyStack(){
  return (
    <Stack.Navigator initialRouteName="UserList">
      <Stack.Screen name="UserList" component={UserList} options={ {title: "User List"} }/>
      <Stack.Screen name="CreateUser" component={CreateUser} options={ {title: "Create a new User"} }/>
      <Stack.Screen name="UserDetails" component={UserDetails} options={ {title: "User Detail"} }/>
    </Stack.Navigator>
  )
}
/**
 * El initial Route name seria el home
 * Para cada screen de la aplicación habrá un Stack.Screen,
 * pongo estos comentarios acá porque si los pongo ahi en linea me reconoce los {} como si quisiera meter codigo o 
 * meter mas componentes y solo debe haber Screens dentro de un Navigator
 */

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}
