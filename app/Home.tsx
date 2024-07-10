import { FlatList, Image, Modal, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons"
import SearchIcon from "react-native-vector-icons/Fontisto"
import ProfileIcon from "react-native-vector-icons/Feather"
import ReelIcon from "react-native-vector-icons/Octicons"
import ShopIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const logo = require("../assets/images/logos_instagram.png")
export default function Home() {
    
    const navigation = useNavigation();
    const [selectedmenu , setSelectedmenu] = useState("Home")
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" /> 
            <ScrollView style={styles.scrollcontainer} scrollEnabled={false} >
               <View style={styles.Viewrow}>
               <Image source={logo}  style= {styles.insta_logo_style}/>
               <View style={{flexDirection:'row'}}>
                   <FontAwesome5 name="heart"  style={styles.iconstyle} />
                   <FontAwesome5 name="facebook-messenger" style={styles.iconstyle}/>   
               </View>

               </View>
               <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.view_row , {justifyContent:"flex-start"}]}>
            <Image source={require("../assets/images/profile.png")} style={styles.Storystyle}  />
            <Image source={require("../assets/images/profile.png")} style={styles.Storystyle} />
            <Image source={require("../assets/images/profile.png")} style={styles.Storystyle} />
            <Image source={require("../assets/images/profile.png")} style={styles.Storystyle}  />
            <Image source={require("../assets/images/profile.png")} style={styles.Storystyle} />
            <Image source={require("../assets/images/profile.png")} style={styles.Storystyle} />
        </ScrollView> 
               <View>

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
    insta_logo_style:{
     width:"40%",
     resizeMode:"contain",
     height:50,
    },
    Viewrow:{
        justifyContent:"space-between",
        flexDirection:"row",
        paddingVertical:10,

    },
    iconstyle:{
        color:"black",
        fontSize:25,
        marginHorizontal:10,
    },
    Storystyle : {
        width: 50,
        borderColor:"#db2777",
        borderWidth:1, 
        height:50, 
        borderRadius: 50 , 
        marginRight:12,  
    },


})
