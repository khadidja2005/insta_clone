import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './index';
import Signin from './Signin';
import Editprofiles from './Editprofiles';


const Stack = createStackNavigator();

function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Editprofiles" component={Editprofiles} options={{ headerShown: false }} />
        <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
        <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} /> 
      </Stack.Navigator>
  );
}

export default App;
