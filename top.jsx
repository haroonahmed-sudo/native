

import 'react-native-gesture-handler';

import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import Profile from './Profile';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: '#000',
        style: {
          backgroundColor: '#fff',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
        }} />
      <Tab.Screen
        name="about"
        component={About}
        options={{
          tabBarLabel: 'About',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="settings" color={color} size={size} />
          // ),
        }} />
    </Tab.Navigator>
  );
}

function App2(props) {
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabStack" component={TabStack} options={{
        title: 'Hisab Kitab',
        headerStyle: {
          elevation:0,
          shadowOpacity:0
        },
        headerTitleStyle: {
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 20,
          marginRight: 60,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS

        },
      
        headerLeft: () => (
          <AntDesign
            name="menuunfold"
            size={24}
            color="black"
            style={{ marginLeft: 20 }}
            onPress={() => props.navigation.openDrawer()}
          />
        ),
      }} />
    </Stack.Navigator>
  );
}

export default App2;
const About = (props) => {
  
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>

      <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>About Us</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10, textAlign: 'center' }}>Hello This App Is Based On Daily Expense And We Will Not Share Your Details With AnyOne</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop:20}}>Thank You Visit Again!!</Text>

        {/* <AdMobBanner
                    style={{marginTop:10}}

        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3975611615807396/4602417469" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={true} // true or false
        onDidFailToReceiveAdWithError={()=>alert('SomeThing Went Wronh')} />
          <AdMobBanner
          style={{marginTop:10,width:280,alignItems:'center'}}
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3975611615807396/4602417469" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={true} // true or false
        onDidFailToReceiveAdWithError={()=>alert('SomeThing Went Wrong')} /> */}
      </View>
    </View>
  )
}
