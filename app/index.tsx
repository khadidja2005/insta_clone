import React, { useState } from 'react';
import { View, Text, TextInput, Button , StyleSheet } from 'react-native';
import {auth} from "./firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    createUserWithEmailAndPassword(auth , email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User registered: ', user);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };

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
    <View style = {styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={signUp} />
      <Button title="Sign In" onPress={signIn} />
    </View>
  );
}
const styles = StyleSheet.create({
 container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 }
});
