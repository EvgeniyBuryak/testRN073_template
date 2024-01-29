import React from 'react';
import Routes from '~/navigation/Routes.constants';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '~/features/auth';

export const initialRoute = Routes.AuthScreen;

const Stack = createStackNavigator();

export default function AuthStack() {
  return(
    <Stack.Navigator
      initialRouteName={initialRoute}
    >
      <Stack.Screen
        name={Routes.AuthScreen}
        component={AuthScreen}
        options={{
            headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
