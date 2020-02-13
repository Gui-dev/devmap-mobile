import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Main from './../pages/Main'
import Profile from './../pages/Profile'

function Routes() {

  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DevMap"
        screenOptions={ {
          headerStyle: {
            backgroundColor: "#7D40E7"
          },
          headerTintColor: "#FFF"
        } }
      >
        <Stack.Screen 
          name="DevMap" 
          component={ Main } 
        />
        <Stack.Screen 
          name="Profile" 
          component={ Profile } 
          options={ { title: 'Perfil no Github' } }
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes