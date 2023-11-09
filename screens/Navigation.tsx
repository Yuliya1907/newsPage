import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import CreateNewsScreen from './CreateNews';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';

const Stack = createStackNavigator();

export const AppStack = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{setShouldRefresh}}
        />
        <Stack.Screen
          name="AddNews"
          component={CreateNewsScreen}
          options={{title: 'New post'}}
          initialParams={{setShouldRefresh}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
