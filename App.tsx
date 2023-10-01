import React from 'react';
import {View, StatusBar} from 'react-native';
import {AppStack} from './screens/Navigation';

export default function App() {
  return (
    <View>
      <AppStack />
      <StatusBar />
    </View>
  );
}
