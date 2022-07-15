import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/Signin';
import { SignupFirstStep } from '../screens/SignupFirstStep';
import { SignupSecondStep } from '../screens/SignupSecondStep';
import { Confirmation } from '../screens/Confirmation';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return(
      <Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='Splash'
      >
        <Screen
          name="Splash"
          component={Splash}
        />
        <Screen 
          name='SignIn' 
          component={SignIn} 
        />
        <Screen 
          name='SignupFirstStep' 
          component={SignupFirstStep} 
        />
        <Screen 
          name='SignupSecondStep' 
          component={SignupSecondStep} 
        />
        <Screen
          name="Confirmation" 
          component={Confirmation}

          // Prevents back to Splash in IOS
          options={{
            gestureEnabled: false,
          }} 
        />
      </Navigator>
  )
}