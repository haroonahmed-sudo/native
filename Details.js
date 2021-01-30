import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  ScrollView,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, AntDesign, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from './config.jsx';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Appbar, Card } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const SeeDeatils = (props) => {

  const [selectedItems, setselectedItems] = useState([]);
  const [selectedItems1, setselectedItems1] = useState([]);
  const [see, setSee] = useState(false)
  const [see1, setSee1] = useState(false)
  const [abc, setAbc] = useState(false)

  const FetchData = async (props) => {
    const value = await AsyncStorage.getItem('Mykey');
    const db = firebase.firestore();
    db.collection('Amounts')
      .where('uId', '==', value).onSnapshot((data) => {
        setselectedItems(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        setselectedItems1(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        setAbc(true)

      });
  };
  useEffect(() => {
    FetchData()
  }, [])
  useEffect(() => {
    const data = async () => {
      const key = await AsyncStorage.getItem('Mykey')
      if (key !== null) {
        setSee(true)
        setSee1(false)
      } else {
        setSee1(true)

      }
    }
    data()
  }, [])



  const Deeleete = async (id) => {
    if (await AsyncStorage.getItem('Mykey') !== null) {
      const db = firebase.firestore();
      db.collection('Amounts').doc(id).delete();
    }
    else {
      alert('Login First')
    }

  };
  const [search, setSearch] = useState('')

  const searchData = (text) => {
    const newData = selectedItems1.filter(item => {
      const itemData = item.Item.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });

    setselectedItems(newData)
    setSearch(text)
  }
  useEffect(() => {
    FetchData()
  }, [])
  return (
    <View style={{ height: '100%', backgroundColor: '#fff' }}>
      <ScrollView>

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
            subtitle="Details"

          />
        </Appbar.Header>
        <View style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
          <View style={{ width: 275, marginTop: 20 }}>
            <Button title="Show Data" color="#483D8B" onPress={FetchData} />
          </View>
          {abc == true ? <TextInput
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#bbb',
              width: 280,
              padding: 10,
              marginTop: 20,
              borderRadius: 5

            }}
            placeholder="Search Here"
            value={search.trim()}
            onChangeText={(txt2) => searchData(txt2)}
          /> : null}
          <FlatList
            data={selectedItems}
            renderItem={({ item, index }) => (
              <View style={{ marginTop: 10, textAlign: 'justify' }}>
                <Card style={{ flexDirection: 'row', textAlign: 'justify' }}>
                  <View style={{ flexDirection: 'row', padding: 10, flex: 1, alignItems: 'center', textAlign: 'justify' }}>
                    <Text style={{ fontSize: 20, width: '32%' }}> {item.Item} </Text>
                    <Text style={{ fontSize: 20, width: '20%' }}> {item.Amount} </Text>
                    <Text style={{ fontSize: 20, }}> {item.DateCreated} </Text>
                    <AntDesign
                      name="delete"
                      size={24}
                      style={{ paddingLeft: 10, width: '12%', }}
                      color="black"
                      onPress={() => Deeleete(item.id)}
                    /></View></Card>
              </View>

            )}
          />
        </View>
        <View style={{ display: 'flex', alignItems: 'center' }}>

          <View style={{
            textAlign: 'center',

            color: 'white',
            fontWeight: 'bold',
            marginTop: 15,
            width: 275,
            marginBottom: 15

          }}>
            <Button color="#483D8B" title="Enter More"
              onPress={() => props.navigation.navigate('Home')} />
          </View>

        </View>
      </ScrollView>

    </View>
  );
};

export default SeeDeatils  