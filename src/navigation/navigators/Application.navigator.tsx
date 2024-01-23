import React from "react"

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "../Routes.constants";
import StartScreen from "~/features/start";

const initialSwitchRoute = Routes.InitialScreen;

interface IRootStackProps {}

const isAuthorized= undefined;

const RootStackNavigator: React.FC<IRootStackProps> = (props: IRootStackProps) => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialSwitchRoute}
        screenOptions={{
          animationEnabled: false,
        }}
      >
        {isAuthorized === undefined ? (
          <Stack.Screen
            name={Routes.InitialScreen}
            component={StartScreen}
            options={{
                headerShown: false,
            }}
          />
        ) : isAuthorized ? (
            <></>
        ) : (
          <Stack.Screen
            name={Routes.AuthNavigator}
            component={StartScreen}
            options={{
                headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackNavigator;