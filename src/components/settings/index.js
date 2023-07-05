import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { OAuth } from '../../auth';
import Header from '../../utils/Header';
import BackHeader from '../../utils/BackHeader';
import Footer from '../../utils/Footer';
import { ref, set, update, onValue, remove } from 'firebase/database';
import { db } from '../../config';
import { getSecureImg } from '../../redux/reducer/secureImg/index';
import { useDispatch, useSelector } from 'react-redux';
import GridView from '../../utils/GridView';
import Styles from './styles';
// import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const SettingActivity = ({ navigation }) => {
  const { userDetails } = useContext(OAuth);
  const dispatch = useDispatch();
  const { secureImgData } = useSelector(({ secureImg }) => secureImg);

  return (
    <SafeAreaView style={Styles.dashboardMainContainer}>
      <View style={Styles.headerView}>
        <BackHeader
          navigation={navigation}
          goToBack={() => {
            navigation.goBack();
          }}
          activityText="Settings"
        />
      </View>
      <SafeAreaView style={Styles.safeAreaViewContainer}>
        <View style={Styles.securityCheckUpMainContainer}>
          <View style={Styles.securityIconContainer}>
            <MaterialCommunityIcons name="shield-check" size={32} color="green" />
          </View>

          <Text style={Styles.securityCheckUpText}>Security Checkup</Text>
          <Text style={Styles.verifiedText}>Verified</Text>
        </View>

        <Text style={Styles.settingLabelText}>Settings</Text>

        <SafeAreaView style={Styles.optionItemSafeAreaView}>
          <View style={Styles.menuItemsMainContainer}>
            <View style={Styles.manuItemsContentContainer}>
              <Ionicons name="person-circle-outline" size={30} color="#2560ff" />
              <Text style={Styles.menuItemLabelText}>Profile</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}
              style={Styles.menuItemAction}
            >
              <MaterialIcons name="arrow-right" size={24} color="#2560ff" />
            </TouchableOpacity>
          </View>

          <View style={Styles.menuItemsMainContainer}>
            <View style={Styles.manuItemsContentContainer}>
              <MaterialCommunityIcons name="alert-circle" size={28} color="#2560ff" />
              <Text style={Styles.menuItemLabelText}>Update Password</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UpdatePassword');
              }}
              style={Styles.menuItemAction}
            >
              <MaterialIcons name="arrow-right" size={24} color="#2560ff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* <Text style={{
                marginTop:10,
                fontWeight:'bold',
                    fontSize:15,
                    // backgroundColor:'#c1bebe66',
                    color:'#bbbbbb',
                    fontFamily:'Poppins',
                    textAlign:'left',
                }}>Enable Privacy</Text>

            <SafeAreaView style={{
                paddingTop:10,
                paddingBottom:20,
                borderBottomWidth:1,
                borderColor:'#c2c2c2',

            }}>
                <View style={{
                    width:'100%',
                    height:50,
                    // borderWidth:2,
                    display:'flex',
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'space-between'
                }}>
                    <View style={{
                        display:'flex',
                        alignItems:'center',
                        flexDirection:'row',
                    }}>
                <MaterialCommunityIcons name="shield-alert-outline" size={30} color="green" />

                     <Text style={{
                        fontSize:16,
                        fontFamily:'Poppins',
                        marginLeft:10,
                        fontWeight:'bold',
                    }}>Enable Privacy Lock</Text>
                    </View>
                    
                    <TouchableOpacity style={{
                        // borderWidth:1,
                        padding:4,
                        paddingLeft:15,
                        paddingRight:15,
                        borderRadius:5,
                        // borderColor:'#2560ff'
                    }}>
                    <Entypo name="switch" size={30} color="blue" />
                    </TouchableOpacity>
                </View>
                
            </SafeAreaView> */}

        {/* <Text  style={{
                marginTop:10,
                fontWeight:'bold',
                color:'#bbbbbb',
                    fontSize:15,
                    // backgroundColor:'#c1bebe66',
                    fontFamily:'Poppins',
                    textAlign:'left',
                    // borderTopWidth:2,
                    // borderTopColor:'#c1c1c1'
                }}>Updates</Text>

            <SafeAreaView style={{
                paddingTop:10,
                paddingBottom:10,
                borderBottomWidth:1,
                borderColor:'#c2c2c2',

            }}>
                

                <View style={{
                    width:'100%',
                    height:50,
                    // borderWidth:2,
                    display:'flex',
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'space-between'
                }}>
                <View style={{
                        display:'flex',
                        alignItems:'center',
                        flexDirection:'row',
                    }}>
                <Ionicons name="checkmark-circle-outline" size={30} color="green" />
                <Text style={{
                    marginLeft:10,
                    color:'green',
                    fontSize:15,
                    fontFamily:'Poppins',
                }}>Updated 10d ago</Text>
                </View>
                
                <TouchableOpacity style={{
                        // borderWidth:1,
                        padding:6,
                        paddingLeft:10,
                        paddingRight:10,
                        borderRadius:5,
                        backgroundColor:'red',
                        color:'#fff',

                    }}>
                <Text style={{
                    color:'#fff',
                    fontSize:14,
                    fontFamily:'Poppins',
                }}>change</Text>
                </TouchableOpacity>
                    
                </View>

                
            </SafeAreaView> */}
      </SafeAreaView>
    </SafeAreaView>
  );
};
export default SettingActivity;
