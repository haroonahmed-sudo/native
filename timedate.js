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
import { Ionicons, AntDesign, SimpleLineIcons, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

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
import Time from './timepicker'
import Date from './Todos'
const Tab = createBottomTabNavigator();
export default function MyTabs() {
    return (
        <Tab.Navigator initialRouteName="Date">
            <Tab.Screen name="Date" component={Date}
                options={{
                    tabBarLabel: 'Date Todos',
                    tabBarIcon: () => (
                        <MaterialIcons name="date-range" size={24} color="#483D8B" />
                    )
                }}

            />
            <Tab.Screen name="Time" component={Time}
                options={{
                    tabBarLabel: 'Time Todos',
                    tabBarIcon: () => (
                        <AntDesign name="clockcircleo" size={24} color="#483D8B" />)
                }}
            />
        </Tab.Navigator>
    );
}