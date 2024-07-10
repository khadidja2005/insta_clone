import { FlatList, Image, Modal, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons"
import Icon2 from "react-native-vector-icons/MaterialIcons";
import SearchIcon from "react-native-vector-icons/Fontisto"
import ProfileIcon from "react-native-vector-icons/Feather"
import ReelIcon from "react-native-vector-icons/Octicons"
import ShopIcon from "react-native-vector-icons/MaterialCommunityIcons"
import ArrowIcon from "react-native-vector-icons/MaterialIcons"
import Setting from "react-native-vector-icons/SimpleLineIcons"
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
export default function Profile () {
    const navigation = useNavigation();
    const [selectedmenu , setSelectedmenu] = useState("Profile")
    const [modalVisible, setModelVisible] = useState(false)
    const [selectedoption , setSelectedoption] = useState("posts")
    let x = 0;
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
    useEffect(()=> {
    const fetchData =async()=> {
     const docref =  doc(db , "users" , auth.currentUser.uid)
     const docSnap = await getDoc(docref)
     if (docSnap.exists()){
     setUser(docSnap.data())
     }
     else {
        console.log("user does not exist")
     }

    }
    fetchData();
    } , [])
    const renderItem = ({item}: {item: any})=> {
        console.log(item)
        return (
        <View style={styles.postContainer}>
            <Image source={{uri:item.photourl}} style={styles.postImage} />
     </View>
        )

    }
return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />  
     <ScrollView contentContainerStyle={styles.scrollcontainer} >
        <View>
         <View style={styles.view_row}>
            <ArrowIcon name="arrow-back-ios" size={25} onPress={()=> navigation.navigate('Home')} />
            <Text style={{fontSize:20}}>{user.username}</Text>
            <Setting name="plus" size={25} onPress={()=>setModelVisible(true)}/>
         </View>
         <View style={[styles.view_row,{gap:15}]}>
         <Image source={{uri:user.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} style={{ width: 90, height:90, borderRadius: 50 , marginRight:10 }} /> 
         <View style={[styles.view_row,{paddingHorizontal:5,}]}>
          <View style={styles.view_info}>
          <Text style={styles.text}>{user.posts.length}</Text>
           <Text>Posts</Text>
          </View>
          <View style={styles.view_info}>
          <Text style={styles.text}>{user.followers.length}</Text>
           <Text>Followers</Text>
          </View>
          <View style={styles.view_info}>
          <Text style={styles.text}>{user.following.length}</Text>
           <Text>Following</Text>
          </View>
         </View>
         </View>
         <View style={styles.view_name}>
             <Text style={{fontWeight:"bold"}} >{user.name}</Text>
            <Text >{user.bio}</Text>
            <Text >{user.link}</Text>
         </View> 
         <View style={styles.view_row}>
            <Pressable style={styles.pressablestyle} onPress={()=> navigation.navigate("Editinfo")}>
                <Text>Edit Profile</Text>
            </Pressable>
            <Pressable style={styles.pressablestyle}>
                <Text>Share</Text>
            </Pressable>
        </View>
        <View style={[styles.view_row , {justifyContent:"flex-start"}]}>
            <Image source={require("../assets/images/profile.png")} style={styles.Storystyle}  />
            <Image source={require("../assets/images/profile.png")} style={styles.Storystyle} />
            <Image source={require("../assets/images/profile.png")} style={styles.Storystyle} />
        </View> 
        
        <View style={styles.view_row}>
        <MaterialIcons name="window" size={25} style={[{marginLeft:10},selectedoption=="posts"?{color:"black"}:{color:"#aaa"}]} onPress={()=>setSelectedoption("posts")}  />
        <Octicons name="video" size={25} style={selectedoption=="reels"?{color:"black"}:{color:"#aaa"}} onPress={()=>setSelectedoption("reels")}   />
        <Feather name="user" size={25}  style={[{marginRight:10}, selectedoption=="tags"?{color:"black"}:{color:"#aaa"}]} onPress={()=>setSelectedoption("tags")}  />
        </View> 
        <View >
        <FlatList 
        renderItem={renderItem} 
        data={user.posts} 
        keyExtractor={(item, index) => String(index)}
        numColumns={3}
        contentContainerStyle={{ paddingHorizontal: 5, paddingTop: 10 }}/> 
        </View>

        </View>
        <Modal visible={modalVisible} transparent={true} animationType="fade" >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                   <Icon2 name="close" size={30} color="#000" onPress={()=>setModelVisible(false)} /> 
                    <Pressable style={[styles.pressablemodal,{marginTop:10}]} onPress={()=> navigation.navigate("Createpost")}>
                        <Text style={{fontSize:18}}>New Post</Text>
                    </Pressable>
                    <Pressable style={styles.pressablemodal}>
                        <Text style={{fontSize:18}}>New Reel</Text>
                    </Pressable>
                    <Pressable style={styles.pressablemodal}>
                        <Text style={{fontSize:18}}>New Story</Text>
                    </Pressable>
                </View>
            </View>     
            </Modal>
     </ScrollView>
      <View style={styles.tab_view}>
        <TouchableOpacity onPress={()=>{navigation.navigate("Home")
            setSelectedmenu("Home")
        }}>
           <Icon name = "home" style={selectedmenu=="Home" ? styles.tab_icon_selcted : styles.tab_icon} /> 
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            navigation.navigate("Search") 
            setSelectedmenu("Search")} }>
           <SearchIcon name="search" style={selectedmenu=="Search" ? styles.tab_icon_selcted : styles.tab_icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {
            navigation.navigate("Reels")
            setSelectedmenu("Reels")}}>
           <ReelIcon name ="video" style={selectedmenu=="Reels" ? styles.tab_icon_selcted : styles.tab_icon}  /> 
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{ 
          navigation.navigate("Shop")
          setSelectedmenu("Shop")
        }}>
          <ShopIcon name="shopping-outline" style={selectedmenu=="Shop" ? styles.tab_icon_selcted : styles.tab_icon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            navigation.navigate("Profile")
            setSelectedmenu("Profile")}}>
           <ProfileIcon name ="user" style={selectedmenu=="Profile" ? styles.tab_icon_selcted : styles.tab_icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
)  
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    scrollcontainer:{
    paddingBottom:60,
    paddingHorizontal:10,
    },

    tab_view : {
        backgroundColor:"#fff",
        bottom:0,
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around",
        position:"absolute",
        paddingVertical:12,
        borderTopColor:"#eee",
        borderWidth:1,
        zIndex:100,
    },
    tab_icon: {
      color:"#555",
      fontSize:25,
    },
    tab_icon_selcted:{
     fontSize:27,
     paddingHorizontal:5,
     color:"#000"
     
    },
    view_row: {
        flexDirection: "row",
        flex:1,
        justifyContent: "space-between",
        paddingHorizontal:20,
        paddingVertical:10,
        alignItems:"center",
    },

    view_info:{
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
        gap:5,
    },
    text:{
        fontSize:16,
        color:"#000",
        fontWeight:"bold",
    },
    view_name:{
        paddingHorizontal:10,
        paddingVertical:10,
        gap:2,
    },
    pressablestyle:{
        paddingHorizontal:40,
        paddingVertical:10,
        backgroundColor:"#d6d6d6",
        borderRadius:5

    },
    Storystyle : {
        width: 50,
        borderColor:"#db2777",
        borderWidth:1, 
        height:50, 
        borderRadius: 50 , 
        marginRight:15,  
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 25,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    pressablemodal:{
     paddingHorizontal:10,
     paddingVertical:15,
     borderBottomColor:"#aaa",
     borderBottomWidth:1,
    },
    postContainer: {
        width: "32%",
        aspectRatio: 1, 
        margin: 1, 
      },
      postImage: {
        width: "100%",
        height: "100%",
      },
})