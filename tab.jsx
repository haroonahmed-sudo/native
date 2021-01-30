import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  ActivityIndicator,
  YellowBox,
  Picker,
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
import { Ionicons, AntDesign, SimpleLineIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import firebase from './config.jsx';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Appbar, Card } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SeeDeatils from './Details'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { captureScreen } from "react-native-view-shot";
import CameraRollExtended from "react-native-store-photos-album";
import { add } from 'react-native-reanimated';



const SeeDeatils1 = (props) => {
  const [indi, setIndi] = useState(false)
  const [set, setSet] = useState(false)
  const [see, setSee] = useState(false)
  const [see1, setSee1] = useState(false)
  const [selectedItems, setselectedItems] = useState(0)
  const [selectedValue, setSelectedValue] = useState(1);
  const [month, setmonth] = useState('');
  useEffect(()=>{
    Add()
  },[selectedValue])
  const Add = async () => {
    const value = await AsyncStorage.getItem('Mykey');
    const db = firebase.firestore();
    var value1 = selectedValue;

    db.collection('Amounts')
      .where('uId', '==', value).where('Month', '==', value1).onSnapshot(data => {
       
      var total = parseInt(0)
        data.docs.map(doc => {
          var month1 = doc.data().Month
          setmonth(month1)
          var Amount = doc.data().Amount
          total = total + parseInt(Amount)
          setselectedItems(total)
          setSee(true)
        })
      
      });
  }
  useEffect(() => {
    const data = async () => {
      const key = await AsyncStorage.getItem('Mykey')
      if (key !== null) {
        setSee2(true)
        setSee3(false)
      } else {
        setSee3(true)

      }
    }
    data()
  },[])

  return (
 
    <View style={{ height: '100%', backgroundColor: 'white' }} >
      <Appbar.Header style={{ backgroundColor: 'white' }} >
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
          subtitle="Total"

        />
      </Appbar.Header>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }} >
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          // onPress={Add}
          >
          <Picker.Item label="2020/Jan" value="2020/0" />
          <Picker.Item label="2020/Feb" value="2020/1" />
          <Picker.Item label="2020/March" value="2020/2" />
          <Picker.Item label="2020/April" value="2020/3" />
          <Picker.Item label="2020/May" value="2020/4" />
          <Picker.Item label="2020/June" value="2020/5" />
          <Picker.Item label="2020/July" value="2020/6" />
          <Picker.Item label="2020/Aug" value="2020/7" />
          <Picker.Item label="2020/Sep" value="2020/8" />
          <Picker.Item label="2020/Oct" value="2020/9" />
          <Picker.Item label="2020/Nov" value="2020/10" />
          <Picker.Item label="2020/Dec" value="2020/11"  />
          
          <Picker.Item label="2021/Jan" value="2021/1" />
          <Picker.Item label="2021/Feb" value="2021/2" />
          <Picker.Item label="2021/March" value="2021/3" />
          <Picker.Item label="2021/April" value="2021/4" />
          <Picker.Item label="2021/May" value="2021/5" />
          <Picker.Item label="2021/June" value="2021/6" />
          <Picker.Item label="2021/July" value="2021/7" />
          <Picker.Item label="2021/Aug" value="2021/8" />
          <Picker.Item label="2021/Sep" value="2021/9" />
          <Picker.Item label="2021/Oct" value="2021/10" />
          <Picker.Item label="2021/Nov" value="2021/11" />
          <Picker.Item label="2021/Dec" value="2021/12" />

        </Picker>
        <View style={{ marginTop: 20, width: 275, marginBottom: 20 }}>
          <Button title="Click Here To Check" color="#483D8B" onPress={Add} />
        </View>

        {month == selectedValue ? <Text style={{ fontSize: 20, textAlign: 'justify', }}> Total Amount Is : {selectedItems}  </Text> :<Text style={{ fontSize: 20, textAlign: 'justify', }}> Click On The Button To Check It  </Text>}

        <View style={{ marginTop: 20, width: 275, marginBottom: 10 }}>
       <Button title="Enter More" color="#483D8B" onPress={() => props.navigation.navigate('Home')} />
        </View>

      </View>


      {/* <View style={{flex:0.3,alignItems:'center',margin:20}}>
      <AdMobBanner
          style={{marginTop:10,width:280,alignItems:'center'}}
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3975611615807396/4602417469" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={true} // true or false
        onDidFailToReceiveAdWithError={()=>alert('SomeThing Went Wrong')} />
      <AdMobBanner
          style={{marginTop:10,width:280,alignItems:'center'}}
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3975611615807396/4602417469" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={true} // true or false
        onDidFailToReceiveAdWithError={()=>alert('SomeThing Went Wrong')} />
     </View> */}
    </View>
  )
}

const Tab = createBottomTabNavigator();
export default function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Details">
      <Tab.Screen name="Tab1" component={SeeDeatils}
        options={{
          tabBarLabel: 'Details',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account-card-details" size={24} color="#483D8B" />
          ),

        }}

      />
      <Tab.Screen name="Tab2" component={SeeDeatils1}
        options={{
          tabBarLabel: 'Total',
          tabBarIcon: () => (
            <FontAwesome5 name="money-check" size={24} color="#483D8B" />
          )
        }}
      />
    </Tab.Navigator>
  );
}