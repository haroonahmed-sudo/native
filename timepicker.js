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
    ScrollView,
} from 'react-native';
import { Ionicons, AntDesign, SimpleLineIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import firebase from './config.jsx';
import { Appbar, Card } from 'react-native-paper';
import TimePicker from 'react-native-simple-time-picker';
import { useNavigation } from '@react-navigation/native';
import AlertAsync from "react-native-alert-async";

const Todos = () => {
    const [selectedHours, setSelectedHours] = useState(0)
    const [selectedMinutes, setSelectedMinutes] = useState(0)
    const [todos, setTodos] = useState('')
    const [selectedItems, setselectedItems] = useState([]);
    const [selectedItems11, setselectedItems1] = useState([]);
    const FetchData = async () => {
        const db = firebase.firestore();
        const value = await AsyncStorage.getItem('Mykey')
        if (todos == "") {
            alert('Plz Enter All The Fields')
        }
        else {
            if (value !== null) {
                db.collection('TodosTime').add({
                    name: todos,
                    hours: selectedHours,
                    minutes: selectedMinutes,
                    uid: value
                })
                setTodos('')
            }
            else {
                alert('Please Login First')
            }
        }
    }
    const ShowData = async () => {
        const db = firebase.firestore();
        const value = await AsyncStorage.getItem('Mykey');

        db.collection('TodosTime').where('uid', '==', value).onSnapshot((data) => {
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
                { text: 'Yes', onPress: () => 'yes' },
                { text: 'No', onPress: () => Promise.resolve('no') },
            ],
            {
                cancelable: true,
                onDismiss: () => 'no',
            },
        );

        if (choice === 'yes') {
            if (await AsyncStorage.getItem('Mykey') !== null) {
                const db = firebase.firestore();
                db.collection('TodosTime').doc(id).delete();
            } else {
                alert('Please Login First')
            }
        }
    };
    useEffect(() => {
        ShowData()
    }, [])
    const [search, setSearch] = useState('')

    const navigation = useNavigation()
    const open = () => {
        navigation.openDrawer()
    }

    const filterr = (text) => {
        const newData = selectedItems11.filter(item => {
          const itemData = item.hours.toString();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1 
        });
    
        setselectedItems(newData)
        setSearch(text)
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
                    <View>
                        <TimePicker
                            selectedHours={selectedHours}
                            //initial Hourse value
                            selectedMinutes={selectedMinutes}
                            //initial Minutes value
                            onChange={(hours, minutes) => {
                                setSelectedHours(hours)
                                setSelectedMinutes(minutes)
                            }}
                        />
                        <View style={{ width: 275, marginTop: 10, marginBottom: 10 }}>
                            <Button title="Submit" color="#483D8B" onPress={FetchData} />
                        </View>
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
                        onChangeText={filterr}
                        keyboardType='numeric'
                    />
                    <FlatList
                        data={selectedItems}
                        renderItem={({ item }) => (
                            <Card style={{ backgroundColor: '#ffffff', flex: 1, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: 20, margin: 10 }} onPress={() => Deeleete(item.id)}>{item.name}  {item.hours}:{item.minutes} <AntDesign
                                            name="delete"
                                            size={24}
                                            style={{ paddingLeft: 10 }}
                                            color="black"
                                            onPress={() => Deeleete(item.id)}
                                        />    </Text>
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