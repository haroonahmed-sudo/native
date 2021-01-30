import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
    AsyncStorage,
    ActivityIndicator,
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
import * as Sharing from 'expo-sharing';


function Main({ navigation }) {
    const [selectedItems, setselectedItems] = useState([]);
    const [select, setSelect] = useState('');
    const [amount, setAmount] = useState('');
    const [other, setOther] = useState('');
    const [indi, setIndi] = useState(false);
    const dt = new Date();
    const CreateDate =
        dt.getMonth() + '/' + dt.getDate() + '/' + dt.getFullYear();
    useEffect(() => {
        setIndi(true);
        const FetchData = async () => {
            const db = firebase.firestore();
            await db
                .collection('payments')
                .orderBy('name')
                .onSnapshot((data) => {
                    setselectedItems(
                        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                    );
                    setIndi(false);
                });

            const value = await AsyncStorage.getItem('Mykey');

        };
        FetchData();
    }, []);





    console.log('selected item is:', select);
    console.log(other);

    const Handler = async () => {
        if (amount == '' || select == '') {
            alert('Plz Enter All The Fields');
        } else {
            const db = firebase.firestore();
            if (await AsyncStorage.getItem('Mykey') !== null) {

                db.collection('Amounts').add({
                    Amount: amount,
                    Item: select,
                    DateCreated: CreateDate,
                    uId: await AsyncStorage.getItem('Mykey'),
                });

            }

            navigation.navigate('Submitt', { greet: select, greet1: amount });
            setAmount(' ');
        }
    };
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
            }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    alignItems: 'center',
                }}>
                {indi == true ? (
                    <ActivityIndicator color="blue" size="large" style={{ margin: 10 }} />
                ) : null}
                <SearchableDropdown
                    onItemSelect={(item) => {
                        const items = selectedItems;
                        items.push(item);
                        setSelect(item.name);
                    }}
                    containerStyle={{ padding: 5 }}
                    onRemoveItem={(item, index) => {
                        const items = selectedItems.filter((sitem) => sitem.id !== item.id);
                        setselectedItems(items);
                    }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#fff',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={selectedItems}
                    defaultIndex={2}
                    resetValue={false}
                    textInputProps={{
                        placeholder: 'Enter Goods Name',
                        underlineColorAndroid: 'transparent',
                        style: {
                            padding: 12,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                            width: 280,
                            marginTop: 30,
                        },
                        onTextChange: (text) => console.log('typed value is:', text),
                    }}
                    listProps={{
                        nestedScrollEnabled: true,
                    }}
                />

                <TextInput
                    style={{
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#bbb',
                        width: 275,
                        padding: 10,
                        marginTop: 20,
                    }}
                    placeholder="Enter Amount"
                    value={amount}
                    onChangeText={(txt) => setAmount(txt)}
                />
                <TouchableOpacity
                    style={{
                        textAlign: 'center',
                        padding: 10,
                        backgroundColor: 'blue',
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: 20,
                        width: 275,
                    }}
                    onPress={Handler}>
                    Submit
        </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SeeDeatils')}
                    style={{
                        padding: 10,
                        backgroundColor: 'blue',
                        width: 275,
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: 10,
                    }}>
                    See Deatils
        </TouchableOpacity>
            </View>
        </View>
    );
}

export default Main