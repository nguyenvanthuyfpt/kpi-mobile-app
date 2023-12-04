import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DisInfoScreen from '../screens/DisInfoScreen';
import HomeVisitScreen from '../screens/HomeVisitScreen';
import DetailHomeVisitScreen from '../screens/DetailHomeVisitScreen';
import LoginScreen from '../screens/LoginScreen';
import DetailScreen from '../screens/DetailScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash Screen'>
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="DisInfo" component={DisInfoScreen} />
          <Stack.Screen name="HomeVisit" component={HomeVisitScreen} />
          <Stack.Screen name="DetailHomeVisit" component={DetailHomeVisitScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
