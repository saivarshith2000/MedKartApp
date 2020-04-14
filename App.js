import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Intro from './screens/Intro'
import Register from './screens/Register'
import Login from './screens/Login'
import Home from './screens/Home'
import Buy from './screens/Buy'
import Confirm from './screens/Confirm'
import History from './screens/History'
import User from './screens/User'


Stack = createStackNavigator();

export default class App extends Component{
  
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode={false}>
          <Stack.Screen name="Intro" component={Intro}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Buy" component={Buy} />
          <Stack.Screen name="Confirm" component={Confirm} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="User" component={User} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}