import { View,StyleSheet,TextInput,Text } from "react-native";
import { useEffect, useState } from "react";
import { Button } from "react-native";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home(){
    const navigation=useNavigation()
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [user,setUser]=useState({})

    function handleLogin(){
        if(!name || !password){
           alert('empty field')
           return
        }
        axios.post('https://accounts.tnet.ge/api/ka/user/auth', {
            Email: name,
            Password:password
          })
          .then(function (response) {
            const userInfo=response.data.data?.Data
            // console.log(response.data.data?.Data)
            setUser(response.data.data?.Data)
           AsyncStorage.setItem('user', JSON.stringify(userInfo)).then(()=>{
                navigation.replace('Main',{
                    user:userInfo
                })
        })
          })
          .catch(function (error) {
            // console.log(error.response.data.message.error_data._error[0]);
            alert(error.response.data.message.error_data._error[0])
          });
    }


    useEffect(()=>{
        AsyncStorage.getItem('user').then((value)=>{
            if(value !== null) {
                navigation.replace('Main',{
                    user:JSON.parse(value)
                })
            }
        })
    },[])
    return(
        <View style={styles.container1}>
            <TextInput
            style={styles.container}
            onChangeText={setName}
            value={name}
            placeholder="type email"
            />
            <TextInput
                style={styles.container}
                onChangeText={setPassword}
                value={password}
                placeholder="type password"
                secureTextEntry
            />

            <Button
                style={{marginTop:20}}
                onPress={()=>handleLogin()}
                title='login'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginBottom:20,
      height:40,
      borderWidth:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container1:{
        margin:45,
    },
    nextpage:{
        backgroundColor:'green',
        width:200,
        height:50,
        borderRadius:5,
        margin:20,
        padding:8,
        alignItems:'center',
        justifyContent:'center',
    }
  });