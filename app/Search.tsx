import { FlatList, Image, Modal, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons"
import Icon2 from "react-native-vector-icons/MaterialIcons";
import SearchIcon from "react-native-vector-icons/Fontisto"
import ProfileIcon from "react-native-vector-icons/Feather"
import ReelIcon from "react-native-vector-icons/Octicons"
import ShopIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


import { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
export var username: string;
export default function Search () {
    const navigation = useNavigation();
    const [selectedmenu , setSelectedmenu] = useState("Search")
    const [searchdata , setSearchdata] = useState("")
    const [users , setUsers] = useState<string[]>([])
    const [filteredusers , setFilteredusers] = useState<string[]>([]);

    useEffect(()=> {
        const fetchData = async()=> {
         const alluser = await getDocs(collection(db , "users"))
          setUsers(alluser.docs.map(doc => doc.data().username))
        }
        fetchData();
    
    },[])
    useEffect(()=> {
      const filteruse= ()=> {
        if (searchdata.length === 0){
        setFilteredusers([])
      } else {
        setFilteredusers(users.filter(user => user.toLowerCase().includes(searchdata.toLowerCase())))
      }
      }
      filteruse();
    },[searchdata , users])
return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />  
     <ScrollView contentContainerStyle={styles.scrollcontainer} >
      <View style={styles.viewrow}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" style={{marginVertical:20}} onPress={()=> navigation.navigate("Home")}  />
          <TextInput placeholder="Search" style={{padding:10,backgroundColor:"#f5f5f5",borderRadius:10,marginVertical:10 , width:"90%"}} value={searchdata} onChangeText={setSearchdata}/>
      </View>
      <View>
        {filteredusers.length > 0 && 
        <FlatList
         data={filteredusers}
         keyExtractor={(item , index)=> index.toString()}
         renderItem={({item})=> (
          <View style={styles.viewrow}>
            <Text onPress={() => {
              username = item
              navigation.navigate("Users")}}>{item}</Text>
          </View>
         )}/>}
      </View>
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
    viewrow :{
      flexDirection:"row",
      flex:1,
      width:"100%",
      marginHorizontal:10,
      marginVertical:10,
      alignItems:"center",
      padding:10
    }

})