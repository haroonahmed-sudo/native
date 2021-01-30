import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard
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
import { Appbar } from 'react-native-paper';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

const Signup = (props) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const Create = ({ navigation }) => {
    const auth = firebase.auth()
    auth.createUserWithEmailAndPassword(email, pass).then(async cred => {
      await AsyncStorage.setItem('Mykey', JSON.stringify(cred.user.uid))
      const db = firebase.firestore()
      db.collection('Users').add({
        uid:cred.user.uid,
        email:email,
        id:''
      })
      db.collection('Users').get().then(async res =>{
        res.forEach(async doc =>{
            // var id = doc.id
            if(cred.user.uid == doc.data().uid){
               await AsyncStorage.setItem('id',JSON.stringify(doc.id))
               alert(doc.id)
            }

        })
    })
   
      props.navigation.navigate('Home');
      setEmail(" ")
      setPass(" ")
    }).catch(err => {
      alert(err)
    });

  }
  const bannerError = () =>{
    alert('SomeThing Went Wrong')
  }
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <View style={{ backgroundColor: '#fff', height: '100%' }}>
        <Appbar.Header style={{ backgroundColor: '#fff' }}>
          <AntDesign
            name="menuunfold"
            size={24}
            color="black"
            style={{ marginLeft: 20 }}
            onPress={() => props.navigation.openDrawer()}
          />
          <Appbar.Content
            style={{ display: 'flex', alignItems: 'center', marginRight: 50 }}
            title="Hisab Kitab"
            subtitle="Signup Here"

          />
        </Appbar.Header>
        <View style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
          <TextInput
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#bbb',
              width: 275,
              padding: 10,
              marginTop: 20,
              borderRadius: 5

            }}
            placeholder="Enter Email"
            value={email.trim()}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            autoFocus={true}
            keyboardType='email-address'
          />
          <TextInput
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#bbb',
              width: 275,
              padding: 10,
              marginTop: 20,
              borderRadius: 5

            }}
            placeholder="Enter Password"
            value={pass.trim()}
            onChangeText={(paas) => setPass(paas)}
            autoCapitalize="none"
            secureTextEntry={true}

          />
          <View style={{ marginTop: 20, width: 275 }}>
            <Button title="Submit" color="#483D8B" onPress={Create} />
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate('login')} style={{ marginTop: 10 }}>
            <Text>Already Have An Account</Text>
          </TouchableOpacity>
          {/* <AdMobBanner
                    style={{marginTop:10}}

        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3975611615807396/9647802531" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={true} // true or false
        onDidFailToReceiveAdWithError={bannerError} />
          <AdMobBanner
          style={{marginTop:10,width:280,alignItems:'center'}}
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3975611615807396/9647802531" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={true} // true or false
        onDidFailToReceiveAdWithError={bannerError} /> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Signup