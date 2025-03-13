import './gesture-handler';
import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from "./src/hooks/AuthContext";


import AppNavigator from './src/navegacao/tabnav';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <StatusBar
              barStyle="dark-content"     
              backgroundColor="transparent"
          />
          <AppNavigator />
        </View>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
