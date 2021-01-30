import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  ActivityIndicator,
  Image
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import firebase from './config.jsx';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Appbar, Drawer } from 'react-native-paper';
import Login from './Login'
import Signup from './Signup'
import SeeDeatils from './Details'
import Main from './Home'
import Submitt from './Submit'
import Profile from './Profile'
import Tabs from './tab'
import Top from './top'
import Todos from './Todos'
import TimeDate from './timedate'

const CustomNavigator = (props) => {
  const [see, setSee] = useState(false)

  const handle = async (props) => {
    await AsyncStorage.removeItem('Mykey');
    await AsyncStorage.removeItem('MyEmail');
    await AsyncStorage.removeItem('MyPass');
    const auth = firebase.auth();
    auth.signOut().then(user => {
      alert('You Are Logged Out');
    })

  };
  useEffect(() => {
    const auth = firebase.auth();
    auth.onAuthStateChanged(user1 => {
      if (user1) {
        setSee(true)
      }
    })
  },[])
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <View style={{ margin: 20 }}>

        {see == true ? <Button title="Logout" color="#483D8B" onPress={handle} /> : null}
       
      </View>
    </DrawerContentScrollView>
  );
};
const Stack = createStackNavigator();
function MyDrawer(props) {
  const Mystack = (props) => (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Main}
        options={{
          title: 'Hisab Kitab',
          headerTitleStyle: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 20,
            marginRight: 60,

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
        }}
      />
      <Stack.Screen
        name="Submitt"
        component={Submitt}
        options={{
          title: 'Hisab Kitab',
          headerTitleStyle: {
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 'bold',
            marginRight: 60,
            elevation: 5

          },
        }}
      />
    </Stack.Navigator>

  );
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomNavigator {...props} />}>
      <Drawer.Screen
        name="Home1"
        component={Mystack}
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="SeeDeatils"
        component={Tabs}
        options={{
          title: 'Details',
        }}
      />
      <Drawer.Screen
        name="top"
        component={Top}
        options={{
          title: 'Profile',
        }}
      />
      <Drawer.Screen
        name="TimeDate"
        component={TimeDate}
        options={{
          title: 'Add Todos',
        }}
      />
      <Drawer.Screen
        name="login"
        component={Login}
        options={{
          title: 'Login',
        }}
      />
      <Drawer.Screen
        name="signup"
        component={Signup}
        options={{
          title: 'Signup',
        }}
      />

    </Drawer.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
