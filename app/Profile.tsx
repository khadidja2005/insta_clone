import { Image, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons"
import SearchIcon from "react-native-vector-icons/Fontisto"
import ProfileIcon from "react-native-vector-icons/Feather"
import ReelIcon from "react-native-vector-icons/Octicons"
import ShopIcon from "react-native-vector-icons/MaterialCommunityIcons"
import ArrowIcon from "react-native-vector-icons/MaterialIcons"
import Setting from "react-native-vector-icons/SimpleLineIcons"
import { useNavigation } from "@react-navigation/native";
export default function Profile () {
    const navigation = useNavigation();
return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />  
     <ScrollView style={styles.scrollcontainer}>
        <View>
         <View style={styles.view_row}>
            <ArrowIcon name="arrow-back-ios" size={25}/>
            <Text style={{fontSize:20}}>Username</Text>
            <Setting name="settings" size={25}/>
         </View>
         <View style={[styles.view_row,{gap:15}]}>
         <Image source={require("../assets/images/profile.png")} style={{ width: 90, height:90, borderRadius: 50 , marginRight:10 }} /> 
         <View style={[styles.view_row,{paddingHorizontal:5,}]}>
          <View style={styles.view_info}>
          <Text style={styles.text}>0</Text>
           <Text>Posts</Text>
          </View>
          <View style={styles.view_info}>
          <Text style={styles.text}>60</Text>
           <Text>Followers</Text>
          </View>
          <View style={styles.view_info}>
          <Text style={styles.text}>1345</Text>
           <Text>Following</Text>
          </View>
         </View>
         </View>
         <View style={styles.view_name}>
             <Text style={{fontWeight:"bold"}} >name bdd</Text>
            <Text >I heal when i put my mind to something</Text>
            <Text >www.website.com</Text>
         </View> 
         <View style={styles.view_row}>
            <Pressable style={styles.pressablestyle}>
                <Text>Edit Profile</Text>
            </Pressable>
            <Pressable style={styles.pressablestyle}>
                <Text>Share</Text>
            </Pressable>
        </View>   
        </View>
     </ScrollView>
      <View style={styles.tab_view}>
        <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
           <Icon name = "home" style={styles.tab_icon} /> 
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("Search")}>
           <SearchIcon name="search" style={styles.tab_icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("Reels")}>
           <ReelIcon name ="video" style={styles.tab_icon}  /> 
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("Shop")}>
          <ShopIcon name="shopping-outline" style={styles.tab_icon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
           <ProfileIcon name ="user" style={styles.tab_icon_selcted} />
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

    }
})