import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import RNPickerSelect from 'react-native-picker-select';
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, auth, db, storage } from './firebaseConfig'; // Make sure to adjust the path

export default function Editinfo() {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [link, setLink] = useState("");
    const [gender, setGender] = useState("");
    const [error , setError] = useState("");
    const [success , setSuccess] = useState("");
    const [user , setUser] = useState({
        name:'',
        username:'',
        bio:'',
        phone:"",
        link:'',
        gender:'',
        photoURL:'',
        posts:[],
        followers:[],
        following:[],
        stories:[]
    })


    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
              console.log('User is authenticated');
              console.log('User ID: ', currentUser.uid);
          } else {
              // Redirect to login screen or handle unauthenticated state
              navigation.navigate('Signin');
          }
      });

      return () => unsubscribe();
  }, []);
  useEffect(()=> {
    const fetchData =async()=> {
     const docref =  doc(db , "users" , auth.currentUser.uid)
     const docSnap = await getDoc(docref)
     if (docSnap.exists()){
     const userdata = docSnap.data()    
     setUser(docSnap.data())
     setBio(userdata.bio)
     setName(userdata.name)
     setGender(userdata.gender)
     setLink(userdata.link)
     setPhone(userdata.phone)
     setUsername(userdata.username)
     setProfileImage(userdata.photoURL)

     }
     else {
        console.log("user does not exist")
     }

    }
    fetchData();
    } , [])


    const openImagePicker = async () => {
      //   let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      //   if (permissionResult.granted === false) {
      //       alert("Permission to access camera roll is required!");
      //       return;
      //   }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            const selectedImage = pickerResult.assets[0];
            setProfileImage(selectedImage.uri);
            console.log('Image URI: ', selectedImage.uri); 
        }
    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, blob);
        return getDownloadURL(storageRef);
    };

    const saveProfile = async () => {
      if (profileImage) {

          try {
              const photoURL = await uploadImage(profileImage);
              const userRef = doc(db, "users", auth.currentUser.uid);
              console.log(
                  'Profile data: ',
                  name,
                  username,
                  bio,
                  phone,
                  link,
              )
              await setDoc(userRef, {
                  name,
                  username,
                  bio,
                  phone,
                  link,
                  gender,
                  photoURL,
              }, { merge: true });
              console.log('Profile updated successfully!');
                setSuccess("user updated successfully!");
                setError("");
              setTimeout(()=>navigation.navigate("Profile"),2000);
          } catch (error) {
              console.error('Error saving profile: ', error);
              alert('Error saving profile. Please try again.');
                setError("Error saving profile. Please try again.");
                setSuccess("");
          }
      } else {
          alert('Please select an image');
      }
  };

    const onchange = () => {
        saveProfile();
    };

    return (
        <SafeAreaView>
            <StatusBar barStyle="dark-content" />
            <ScrollView>
            
                <View style={styles.container}>
                    <View style={styles.container_row}>
                        <Icon name="close" size={30} color="#000" onPress={navigation.goBack} />
                        <Text style={styles.text}>Edit profile</Text>
                        <Icon2 name="check" size={30} color="#2B47FC" onPress={onchange} />
                    </View>
                    <View style={styles.view_profile}>
                        {profileImage ? <Image source={{ uri: profileImage }} style={{ width: 100, height: 100, borderRadius: 50 }} /> :
                            <Image source={require("../assets/images/profile.png")} style={{ width: 100, height: 100, borderRadius: 50 }} />}
                        <Text style={styles.text_profile} onPress={openImagePicker}>Change profile photo</Text>
                    </View>
                    <View style={styles.view_input}>
                        <TextInput
                            placeholder="Name"
                            style={styles.textinput}
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            placeholder="Username"
                            style={styles.textinput}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            placeholder="Bio"
                            style={styles.textinput}
                            value={bio}
                            onChangeText={setBio}
                        />
                        <RNPickerSelect value={gender}
                            onValueChange={(value) => setGender(value)}
                            items={[
                                { label: 'Male', value: 'Male' },
                                { label: 'Female', value: 'Female' }
                            ]}
                            placeholder={{
                                label: "Your gender",
                                value: gender
                            }}
                        />
                        <TextInput placeholder="Phone number" style={styles.textinput} value={phone} onChangeText={setPhone} />
                        <TextInput placeholder="Add link" style={styles.textinput} value={link} onChangeText={setLink} />
                        <Text style= {{marginVertical: 10 , color: "red"}}>{error}</Text>
                        <Text style= {{marginVertical: 10 , color: "green"}}>{success}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    container_row: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },
    text: {
        fontSize: 20,
        color: "#000"
    },
    view_profile: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        gap: 30,
    },
    text_profile: {
        fontSize: 20,
        color: "#1877F2"
    },
    view_input: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    textinput: {
        width: "100%",
        padding: 10,
        marginVertical: 5,
        borderBottomWidth: 1,
        borderColor: "#777"
    }
});
