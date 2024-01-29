import React from "react"

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "../Routes.constants";
import StartScreen from "~/features/start";
import AuthScreen from "~/features/auth/Auth.screen";
import { useSelector } from "react-redux";

const initialSwitchRoute = Routes.InitialScreen;

interface IRootStackProps {}

const RootStackNavigator: React.FC<IRootStackProps> = (props: IRootStackProps) => {
  const Stack = createStackNavigator();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

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
            component={AuthScreen}
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