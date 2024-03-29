import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRCodeScanner from "../src/QRCodeScreen";
import LandingPage from "../src/LandingPage";
import Details from "../src/Details";
import Splash from "../src/Splash";
import Login from "../src/Login";
import LoginWithmPin from "../src/LoginWithmPin";
const Stack = createNativeStackNavigator();
const Stack1 = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
         <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
       <Stack.Screen name='Splash' component={Splash}/>
       <Stack.Screen name="Login" component={Login}/>
       <Stack.Screen name="LoginWithmPin" component={LoginWithmPin}/>
       <Stack.Screen name="Home" component={Home}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  return (
      <Stack1.Navigator
        initialRouteName="LandingPage"
        screenOptions={{headerShown: false}}>
       <Stack1.Screen name="LandingPage" component={LandingPage}/>
       <Stack1.Screen name='QRCodeScanner' component={QRCodeScanner}/>
       <Stack1.Screen name='Details' component={Details}/>
      </Stack1.Navigator>
   
  );
}