import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CreateNewsScreen from './CreateNews';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './Home';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="AddNews"
          component={CreateNewsScreen}
          options={{title: 'New post'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
