import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/Signin';
import { SignupFirstStep } from '../screens/SignupFirstStep';
import { SignupSecondStep } from '../screens/SignupSecondStep';

export function StackRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return(
      <Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='SignIn'
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
          name="Home" 
          component={Home}

          // Prevents back to Splash in IOS
          options={{
            gestureEnabled: false,
          }} 
        />
        <Screen 
          name="CarDetails" 
          component={CarDetails} 
        />
        <Screen 
          name="Scheduling" 
          component={Scheduling} 
        />
        <Screen 
          name="SchedulingDetails" 
          component={SchedulingDetails} 
        />
        <Screen 
          name="Confirmation" 
          component={Confirmation} 
        />
        <Screen
          name="MyCars"
          component={MyCars}
        />
      </Navigator>
  )
}