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
    Keyboard,
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
import { Appbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
const Profile = (props) => {
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(null);
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        var idd = await AsyncStorage.getItem('id')

        if (!result.cancelled) {
            setImage(result.uri);
            const db = firebase.firestore()
            db.collection('Users').doc(idd).update({
                id:image
            })
        }
    };
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
        if (user) {
            setEmail(user.email)
        }
        else {
            setEmail('Login First')

        }
    })
    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <View style={{ flex: 1, alignItems: 'center', }}>
                <View style={{margin:15}}>
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                </View>
                {image && <Image source={{ uri: image }} style={{ width: 100, height: 100,borderRadius:50 }} />}
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>You Are Logged In As </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>{email}</Text>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', width: 250, height: 250 }}
                    style={{ margin: 20, borderRadius: 10 }}

                />



            </View>
            <View style={{ flex: 0.1, alignItems: 'center', }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>All {'\u00A9'} Copyrights Reserved</Text>
            </View>
        </View>
    )
}

export default Profile