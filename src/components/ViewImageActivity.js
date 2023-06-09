import React, { useContext } from "react";
import { View, Text,StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native";
import HeaderBack from '../utils/BackHeader'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ref, set, update, onValue, remove } from "@firebase/database";
import { db } from '../config';
import { OAuth } from '../auth';
function ViewImageActivity({ route, navigation }) {
  const { singleIMG } = route?.params;
  const { userData }  = useContext(OAuth);
  const removeSecureIMG = (imgID) => {
    remove(ref(db, `/secureIMG/${userData?.userName}/asset/${imgID}`)).then(() => {
        navigation?.goBack()
    }).catch(() => {
        alert("error")
    })
  }
console.log(singleIMG)
  return (
    <View style={styles.imageViewContainer}>
      <HeaderBack 
            navigation={navigation}
            activityInfo={ singleIMG?.data.name}
            activityAction = {() => {
                return (
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                      <TouchableOpacity onPress={() => {
                        removeSecureIMG(singleIMG?.id)
                      }}>
                        <MaterialCommunityIcons name="delete" size={30} color="#E34B64FF" style={{marginHorizontal:10}} />
                      </TouchableOpacity>
                      <TouchableOpacity >
                        <MaterialCommunityIcons name="cloud-download" size={30} color="#24826FFF" style={{marginHorizontal:10}}/>
                      </TouchableOpacity>
                    </View>
                    
                )
            }}
            
        />
        <Image
          style={{resizeMode:'center',width:500,height:'100%'}}
          source={{
            uri: singleIMG.img
          }}
        />
    </View>
  );
}

export default ViewImageActivity;

const styles = StyleSheet.create({
    imageViewContainer: {
        backgroundColor:'#000111',
        width:'100%',
        height:'100%',
        // marginRight:10,
        // borderWidth:2,
        // padding:6,
        flex: 1,
        display:'flex',
        alignItems: "center",
        justifyContent: "center",
    },
});