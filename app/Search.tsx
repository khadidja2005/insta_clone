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
export default function Search () {
    const navigation = useNavigation();
    const [selectedmenu , setSelectedmenu] = useState("Search")

return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />  
     <ScrollView contentContainerStyle={styles.scrollcontainer} >

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

})