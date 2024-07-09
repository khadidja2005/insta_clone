import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from "./firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
export default function Createpost() {
    const navigation = useNavigation()
    const [caption , setCaption ] = useState('');
    const [profileImage, setProfileImage] = useState();
    const [success , setsuccess]= useState("")
    
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
    const publishPost = async()=>{
        const likes:String[] = []
        const comment:[] = []
        try {
            const photourl= await uploadImage(profileImage)
            const newPost = {
                photourl,
                caption,
                likes,
                comment,
                createdAt : new Date().toISOString()
            }
            const userDoc = doc(db , "users" , auth.currentUser.uid) 
            await updateDoc(userDoc , {
                posts : arrayUnion(newPost)
            })
            console.log("post saved successfully")
            setsuccess("post saved successfully")
         navigation.navigate("Profile")
        } catch(error){
            console.error("Error publishing post: ", error);
            alert('Error saving posts. Please try again.');
            setsuccess("")
        }
    }
return (
   <SafeAreaView style={style.container}>
    <StatusBar barStyle="dark-content" />
    <View style={style.viewtitle}>
        <Text style={style.text}>
            Create a new Post
        </Text>
    </View>
    <ScrollView  style={style.scrollcontainer}>
      <View>
        <View style={[style.viewtitle , {borderWidth:1 , borderRadius:10 , marginVertical:20}]}>
          <Pressable onPress={openImagePicker}>

            <Image source={{uri:profileImage || "https://t3.ftcdn.net/jpg/02/18/21/86/360_F_218218632_jF6XAkcrlBjv1mAg9Ow0UBMLBaJrhygH.jpg"}} width={300} height={300}/>  
         </Pressable>  
        </View>
        <View style={{marginVertical:20}}>
           <TextInput multiline placeholder="Write the caption here ..." value={caption} onChangeText={setCaption}/>
        </View>
        <Text style= {{marginVertical: 10 , color: "green"}}>{success}</Text>
        <View style={style.view_row}>

            <Pressable style={[style.butn,{backgroundColor:"#eee"}]} onPress={()=> navigation.navigate("Profile")}>
                <Text>Discard</Text>
            </Pressable>            
            <Pressable style={[style.butn , {backgroundColor:"#0ea5e9"}]} onPress={publishPost}>
                <Text style={{color:'#fff'}}>publish</Text>
            </Pressable>
        </View>
      </View>
    </ScrollView> 
   </SafeAreaView> 
)
}
const style = StyleSheet.create({
    container:{
        flex:1,
    },
    scrollcontainer:{
    paddingVertical:40,
    paddingHorizontal:20,
    },
    text :{
        fontSize:20,
    },
    viewtitle :{
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:10,
        borderBottomWidth:1,
        borderColor:"#aaa"
    },
    view_row : {
        flexDirection:"row",
        justifyContent:'space-between',
        marginTop:40,
        paddingVertical:10,
        paddingHorizontal:20,
    },
    butn:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10
    }




})