import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PrivateRoutesTypes} from '~/routes/private/types';
import {Private} from '~/screens';
import {TabLayout} from '../layouts';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator<PrivateRoutesTypes>();

export default function PrivateRoutes({}) {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabLayouts" component={TabLayout} />

      <Stack.Screen name="DashBoard" component={Private.DashBoard} />

      <Stack.Screen name="Profile" component={Private.Profile} />
    </Stack.Navigator>
  );
}
