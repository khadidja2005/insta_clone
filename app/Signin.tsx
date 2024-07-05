import React, { useState } from 'react';
import { View, Text, TextInput, Button , StyleSheet, SafeAreaView , Image, Pressable, StatusBar, TouchableOpacity } from 'react-native';
import {auth} from "./firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
const logo = require("../assets/images/logos_instagram.png")



export default function SignIn() {


  
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isvisible , setIsvisible] = useState(false)
  const changevisibility = ()=> {
    setIsvisible(! isvisible)
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth , email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed in: ', user);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };

  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.view_container}>
        <StatusBar barStyle="dark-content" />
        <Image source={logo}  style= {styles.insta_logo_style}/>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style= {styles.style_input} />
        <View style={styles.style_password}>
          <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!isvisible} style={styles.style_input_password} />
          <TouchableOpacity style = {styles.style_icon} onPress={changevisibility}>
          <Icon name = {isvisible ? "visibility": "visibility-off"} color = "#6d6d6d" size = {15}/>
          </TouchableOpacity>
        </View>
       
       {/* <Button title="Sign Up" onPress={signUp} /> */}
       <Pressable onPress={signIn} style= {styles.Pressable_style}>
         <Text  style = {styles.text_style}>Sign In</Text>
       </Pressable>
       <View style = {styles.sign_in_view}>
        <Text style = {{color: "#6d6d6d"}}>Don't have an account ?  </Text>
        <Text onPress={()=> navigation.navigate("index")} style = {{color:"#0095F6" , textDecorationLine :"underline"}}>Sign Up</Text>
       </View>
       {/* <Button title="Sign In" onPress={signIn} /> */}
    </View>
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  container : {
     flex: 1,
     width: "100%",
     backgroundColor: "#fff",
     padding: 10,
 
  },
  view_container : {
   width: "100%",
   justifyContent: "center",
   alignItems: "center",
   flex: 1,
  },
  insta_logo_style : {
   width: "65%", 
   height: 100 , 
   resizeMode : "contain",
   marginVertical : 10,
  },
  style_input : {
   paddingHorizontal :20,
   paddingVertical : 10,
   backgroundColor : "#EEE",
   textAlign: "left",
   width : "90%",
   marginVertical: 10,
   borderColor: "#C5C5C5",
   borderWidth: 1,
   borderRadius :8,
  },
  Pressable_style : {
   width: "90%",
   paddingVertical: 10,
   paddingHorizontal: 20,
   backgroundColor: "#0095F6",
   borderRadius: 8,
   alignItems: "center",
   justifyContent: "center",
   marginVertical: 10,
  },
  text_style : {
   color : "#fff",
   fontSize: 15,
   textAlign: "center",
  },
  sign_in_view : {
   flexDirection: "row",
   justifyContent: "center",
   alignItems: "center",
   marginVertical: 10,
  },
  style_password :{
   flexDirection: "row",
   position: "relative",
   width: "90%",
  },
  style_icon : {
   position : "absolute",
   top: "40%",
   right: 0 ,
   marginRight:10,
 
  },
 
  style_input_password : {
   paddingHorizontal :20,
   paddingVertical : 10,
   backgroundColor : "#EEE",
   textAlign: "left",
   width : "100%",
   marginVertical: 10,
   borderColor: "#C5C5C5",
   borderWidth: 1,
   borderRadius :8,
  },
 
 
 
 
 });
