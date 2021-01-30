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
  Keyboard,
  Image,
  ScrollView,
  Modal,
  ImageBackground
  }
 from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, AntDesign, SimpleLineIcons,MaterialIcons,Entypo } from '@expo/vector-icons';
import firebase from './config.jsx';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Appbar } from 'react-native-paper';


function Main({ navigation }) {
    const [selectedItems, setselectedItems] = useState([]);
    const [select, setSelect] = useState('');
    const [Name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [newamount, setNewAmount] = useState('');
    const [other, setOther] = useState('');
    const [indi, setIndi] = useState(true);
    const [modal,setModal] = useState(false)
    const dt = new Date();
    const CreateDate =
      dt.getMonth() + '/' + dt.getDate() + '/' + dt.getFullYear();
      const Month = dt.getFullYear()+'/'+dt.getMonth().toString()
    useEffect(() => {
      setIndi(true);
      const FetchData = async () => {
        const db = firebase.firestore();
        await db.collection('payments').orderBy('name').onSnapshot((data) => {setselectedItems(
              data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
                      setIndi(false);
  
          });
  
  
        //}
      };
      FetchData();
    }, []);
    
    const Handler = async () => {
      if (amount == null || select == '') {
        alert('Plz Enter All The Fields');
      } else {
        const db = firebase.firestore();
        if (await AsyncStorage.getItem('Mykey') !== null) {
          db.collection('Amounts').add({
            Amount: amount,
            Item: select,
            DateCreated: CreateDate,
            Month:Month,
            uId: await AsyncStorage.getItem('Mykey'),
          });
      navigation.navigate('Submitt', { greet: select, greet1: amount });
            setAmount(' ');
        }
        else{
          alert('Please Login First')
        }
  
       
      }
    };

      const NewHandle = async () =>{
        if (Name == '' || newamount == '') {
          alert('Plz Enter All The Fields');
        } else {
          const db = firebase.firestore();
          if (await AsyncStorage.getItem('Mykey') !== null) {
    
            db.collection('Amounts').add({
              Amount: newamount,
              Item: Name,
              DateCreated: CreateDate,
              Month:Month,
              uId: await AsyncStorage.getItem('Mykey')    
            });
            setModal(false)

          }
          else{
            alert('Please Login First')
          }
    
         
        }
      }
    return ( 
                      
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss()
        }}>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
            
          <Modal visible={modal}>
            <View style={{flex:1,alignItems:'center'}}>
            <Entypo name="squared-cross" size={35} color="#483D8B" style={{marginTop:10}} onPress={()=>setModal(false)}/> 

            <TextInput
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#bbb',
              width: 275,
              padding: 10,
              marginTop: 20,
              borderRadius:5

            }}
            placeholder="Enter Good's Name"
            value={Name.trim()}
            onChangeText={(txt2) => setName(txt2)}
          />
            <TextInput
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#bbb',
              width: 275,
              padding: 10,
              marginTop: 20,
              borderRadius:5

            }}
            placeholder="Enter Amount"
            keyboardType='numeric'
            value={newamount.trim()}
            onChangeText={(txt3) => setNewAmount(txt3)}
            
          />
                   <View  style={{
              textAlign: 'center',
             
              color: 'white',
              fontWeight: 'bold',
              marginTop: 15,
              width: 275,
              marginBottom:15,

              
            }}>
          <Button color="#483D8B" title="Submit" onPress={NewHandle} />
                  </View>
           </View>
          
          </Modal>
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
            
              //setselectedItems(items);
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
                width: 275,
                marginTop: 30,
              },
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
              borderRadius:5

            }}
            placeholder="Enter Amount"
            keyboardType='numeric'
            value={amount.trim()}
            onChangeText={(txt) => setAmount(txt)}
          />
          <View  style={{
              textAlign: 'center',
             
              color: 'white',
              fontWeight: 'bold',
              marginTop: 15,
              width: 275,
              marginBottom:15,

              
            }}>
          <Button color="#483D8B" title="Submit" onPress={Handler}/>
                  </View>
            <View  style={{
              textAlign: 'center',
             
              color: 'white',
              fontWeight: 'bold',
              width: 275,
            }}>
          <Button color="#483D8B" title="See Details" onPress={() => navigation.navigate('SeeDeatils')}/>
          </View>
            <View style={{marginTop:15,width:275}}>
            <Button title="Add"  color="#483D8B" onPress={()=>setModal(true)}/>
            </View>
         
  
  
      

        </View>
      </View> 
           

   </TouchableWithoutFeedback> 
    );
  }
export default Main  