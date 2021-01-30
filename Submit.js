import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
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

const Submitt = (props) => {
  const [selectedItems, setselectedItems] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('Amounts').get();
      setselectedItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    FetchData();
  }, []);

  const { greet, greet1 } = props.route.params;
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 10,
                marginTop: 10,
                textAlign: 'center',
              }}>
              {greet} Rs =
            </Text>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 10,
                marginTop: 10,
                textAlign: 'center',
              }}>
              {greet1}
            </Text>
          </View>

          <View style={{
            textAlign: 'center',

            color: 'white',
            fontWeight: 'bold',
            marginTop: 20,
            width: 275,

          }}>
            <Button color="#483D8B" title="Enter More" onPress={() => props.navigation.goBack()} />
          </View>
          <View style={{
            textAlign: 'center',

            color: 'white',
            fontWeight: 'bold',
            marginTop: 15,
            width: 275,
            marginBottom: 15

          }}>
            <Button color="#483D8B" title="See Details" onPress={() => props.navigation.navigate('SeeDeatils')} />
          </View>
          {/* <AdMobBanner
                    style={{marginTop:10}}

        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3975611615807396/9647802531" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={true} // true or false
        onDidFailToReceiveAdWithError={()=>alert('SomeThing Went Wronh')} />
          <AdMobBanner
          style={{marginTop:10,width:280,alignItems:'center'}}
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3975611615807396/9647802531" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={true} // true or false
        onDidFailToReceiveAdWithError={()=>alert('SomeThing Went Wronh')} /> */}

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Submitt  