import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import SearchIcon from "react-native-vector-icons/Fontisto";
import ProfileIcon from "react-native-vector-icons/Feather";
import ReelIcon from "react-native-vector-icons/Octicons";
import ShopIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const logo = require("../assets/images/logos_instagram.png");

export default function Home() {
    const [imageHeight, setImageHeight] = useState(500);
    const navigation = useNavigation();
    const [selectedMenu, setSelectedMenu] = useState("Home");
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
        const username = user.username
        const photourl = user.photoURL
        const post = item

        return (
        <View style={{marginVertical:10}} >
           <View style={styles.styleheader}>
                <Image source={{uri:photourl}} style={styles.postpro} />
                <Text style={{fontWeight:"bold"}}>{username}</Text>
            </View> 
            <View>
                <Image 
                source={{uri:post.photourl}} 
                style={[styles.post , {height:imageHeight}]} />
                
            </View>
            <View style={styles.styleheader}>
            <FontAwesome5 name="heart" style={styles.icon} />
            <FontAwesome5 name="comment" style={styles.icon} />
            <FontAwesome5 name="share" style={styles.icon} />

            </View>
            <Text style={{paddingVertical:10}}>{post.caption}</Text>
        </View>
        )

    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer} horizontal={false}>
                <View style={styles.header}>
                    <Image source={logo} style={styles.instaLogo} />
                    <View style={styles.iconsContainer}>
                        <FontAwesome5 name="heart" style={styles.icon} />
                        <FontAwesome5 name="facebook-messenger" style={styles.icon} />
                    </View>
                </View>
                <View style={styles.storyContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storyContent}>
                        <Image source={require("../assets/images/profile.png")} style={styles.storyImage} />
                        <Image source={require("../assets/images/profile.png")} style={styles.storyImage} />
                        <Image source={require("../assets/images/profile.png")} style={styles.storyImage} />
                        <Image source={require("../assets/images/profile.png")} style={styles.storyImage} />
                        <Image source={require("../assets/images/profile.png")} style={styles.storyImage} />
                        <Image source={require("../assets/images/profile.png")} style={styles.storyImage} />
                    </ScrollView>
                </View>
                <View>
                <FlatList
                    data={user.posts.reverse()}
                    renderItem={renderItem}
                    keyExtractor={(item)=> item.createdAt}/>
                </View>
            </ScrollView>

            <View style={styles.tabView}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Home");
                    setSelectedMenu("Home");
                }}>
                    <Icon name="home" style={selectedMenu === "Home" ? styles.tabIconSelected : styles.tabIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Search");
                    setSelectedMenu("Search");
                }}>
                    <SearchIcon name="search" style={selectedMenu === "Search" ? styles.tabIconSelected : styles.tabIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Reels");
                    setSelectedMenu("Reels");
                }}>
                    <ReelIcon name="video" style={selectedMenu === "Reels" ? styles.tabIconSelected : styles.tabIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Shop");
                    setSelectedMenu("Shop");
                }}>
                    <ShopIcon name="shopping-outline" style={selectedMenu === "Shop" ? styles.tabIconSelected : styles.tabIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Profile");
                    setSelectedMenu("Profile");
                }}>
                    <ProfileIcon name="user" style={selectedMenu === "Profile" ? styles.tabIconSelected : styles.tabIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 10,
    },
    tabView: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 12,
        borderTopColor: "#eee",
        borderTopWidth: 1,
        zIndex: 100,
        backgroundColor: "#fff",
    },
    tabIcon: {
        color: "#555",
        fontSize: 25,
    },
    tabIconSelected: {
        color: "#000",
        fontSize: 27,
        paddingHorizontal: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "#fff",
    },
    instaLogo: {
        width: "40%",
        resizeMode: "contain",
        height: 50,
    },
    iconsContainer: {
        flexDirection: "row",
    },
    icon: {
        color: "black",
        fontSize: 25,
        marginHorizontal: 10,
    },
    storyContainer: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "#fff",
    },
    storyContent: {
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    storyImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
        borderColor: "#db2777",
        borderWidth: 1,
    },
    postImage :{
        width:50,
        height:50,
        borderRadius:50,

    },
    styleheader:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        paddingVertical:10,
    },
    postpro:{
        width:40,
        height:40,
        borderRadius:50,
        marginRight:10,
    },
    post:{
        width:"100%",
        resizeMode:"contain"
    },
});
