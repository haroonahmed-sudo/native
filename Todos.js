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
  Keyboard,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Ionicons, AntDesign, SimpleLineIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import AlertAsync from "react-native-alert-async";

import firebase from './config.jsx';
import { Appbar, Card } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import { useNavigation } from '@react-navigation/native';
const Todos = () => {
  const [date, setDate] = useState('')
  const [todos, setTodos] = useState('')
  const [selectedItems, setselectedItems] = useState([]);
  const [selectedItems1, setselectedItems1] = useState([]);
  const [search, setSearch] = useState('')
  const FetchData = async () => {
    const db = firebase.firestore();
    const value = await AsyncStorage.getItem('Mykey')
    if (todos == "" || date == "") {
      alert('Plz Enter All The Fields')
    }
    else {
      if (value !== null) {
        db.collection('Todos').add({
          name: todos,
          date: date,
          uid: value
        })
        setTodos('')
        setDate('')
      }
      else {
        alert('Please Login First')
      }
    }
  }
  const ShowData = async () => {
    const value = await AsyncStorage.getItem('Mykey');
    const db = firebase.firestore();
    db.collection('Todos').where('uid', '==', value).onSnapshot((data) => {
      setselectedItems(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
      setselectedItems1(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    });
  }
  const Deeleete = async (id) => {
    const choice = await AlertAsync(
      'Alert',
      'Are You Sure Do You Want To Delete',
      [
        {text: 'Yes', onPress: () => 'yes'},
        {text: 'No', onPress: () => Promise.resolve('no')},
      ],
      {
        cancelable: true,
        onDismiss: () => 'no',
      },
    );
  
    if (choice === 'yes') {
    if (await AsyncStorage.getItem('Mykey') !== null) {
      const db = firebase.firestore();
      db.collection('Todos').doc(id).delete();
    }else {
      alert('Please Login First')
    }
    }
  
  };
  useEffect(() => {
    ShowData()
  }, [])
  const searchData = (text) => {
    const newData = selectedItems1.filter(item => {
      const itemData = item.date;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1

    });

    setselectedItems(newData)
    setSearch(text)
  }
  const navigation = useNavigation()
  const open = () => {
    navigation.openDrawer()
  }
  
  return (
    <View style={{ backgroundColor: '#fff', height: '100%' }}>
 <ScrollView
            >
        <Appbar.Header style={{ backgroundColor: '#fff' }}>
          <AntDesign
            name="menuunfold"
            size={24}
            color="black"
            style={{ marginLeft: 20 }}
            onPress={open}
          />
          <Appbar.Content
            style={{ display: 'flex', alignItems: 'center', marginRight: 50 }}
            title="Hisab Kitab"
            subtitle="Add Todos"

          />
        </Appbar.Header>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <TextInput
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#bbb',
              width: 280,
              padding: 10,
              marginTop: 20,
              borderRadius: 5

            }}
            placeholder="Enter Here"
            value={todos}
            onChangeText={(text) => setTodos(text)}
            multiline
          />
          <DatePicker
            style={{ width: 200, marginBottom: 10, marginTop: 10 }}
            date={date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => setDate(date)}
          />
          <View style={{ width: 275, marginTop: 10, marginBottom: 10 }}>
            <Button title="Submit" color="#483D8B" onPress={FetchData} />
          </View>
          <View style={{ width: 275, marginBottom: 20 }}>
            <Button title="Show Data" color="#483D8B" onPress={ShowData} />
          </View>
          <TextInput
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#bbb',
              width: 280,
              padding: 10,
              borderRadius: 5

            }}
            placeholder="Enter Here"
            value={search}
            onChangeText={(text1) => searchData(text1)}
            keyboardType="numeric"
          />
          <FlatList
            data={selectedItems}
            renderItem={({ item }) => (
              <Card style={{ backgroundColor: '#ffffff', flex: 1, alignItems: 'center' }}>
                <View style={{  flexDirection: 'row' }}>
                  <TouchableOpacity >
                    <Text style={{ fontSize: 20, margin: 10}} onPress={() => Deeleete(item.id)}>{item.name}  {item.date} <AntDesign
                      name="delete"
                      size={24}
                      style={{ paddingLeft: 10 }}
                      color="black"
                      onPress={() => Deeleete(item.id)}
                    />  </Text>

                  </TouchableOpacity>


                </View></Card>
            )}
          />
        </View>
      </ScrollView>
    </View>
  )
}
export default Todos