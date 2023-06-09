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
import { Fontisto } from '@expo/vector-icons';
const ProfileActivity = ({ navigation }) => {
  const { userDetails } = useContext(OAuth);
  const dispatch = useDispatch();
  const { secureImgData } = useSelector(({ secureImg }) => secureImg);

  return (
    <SafeAreaView style={Styles.dashboardMainContainer}>
      <View style={Styles.headerView}>
        <BackHeader
          navigation={navigation}
          activityText="Profile"
          leftAction={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  //  console.log("save")
                  navigation.navigate('EditProfile');
                }}
              >
                <View>
                  <MaterialCommunityIcons name="account-edit" size={24} color="blue" />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <SafeAreaView style={Styles.safeAreaViewStyles}>
        <View style={Styles.securityContainer}>
          {/* <MaterialIcons name="security" size={30} color="green" /> */}
          {/* <Ionicons name="shield-checkmark-sharp" size={32} color="green" /> */}

          <View style={Styles.iconContainer}>
            <MaterialCommunityIcons name="shield-check" size={32} color="green" />
            {/* <MaterialCommunityIcons name="shield-alert" size={32} color="red" /> */}
          </View>
        </View>
        <View style={Styles.infoViewContainer}>
          {/* <MaterialIcons name="security" size={30} color="green" /> */}
          {/* <Ionicons name="shield-checkmark-sharp" size={32} color="green" /> */}

          <Text style={Styles.profileText}>Redix Kernal</Text>
          <Text style={Styles.profileMailText}>RedixKernal@rdx.com</Text>
        </View>

        <View style={Styles.counterContainer}>
          {/* <MaterialIcons name="security" size={30} color="green" /> */}
          {/* <Ionicons name="shield-checkmark-sharp" size={32} color="green" /> */}

          <View style={Styles.allConutContainer}>
            <Text style={Styles.allConut}>56</Text>
            <Text style={Styles.countLabelText}>All</Text>
          </View>

          <View
            style={{
              ...Styles.allConutContainer,
              ...Styles.middleCounterContainer,
            }}
          >
            <Text style={Styles.allConut}>12</Text>
            <Text style={Styles.countLabelText}>Favorite</Text>
          </View>

          <View style={Styles.allConutContainer}>
            <Text style={Styles.allConut}>06</Text>
            <Text style={Styles.countLabelText}>Trash</Text>
          </View>
        </View>

        <Text style={Styles.labelHeadingText}>About</Text>

        <SafeAreaView style={Styles.actionsSafeAreaViewContainer}>
          <View style={Styles.listItemContainer}>
            <View style={Styles.listItemContentContainer}>
              <Fontisto name="mobile" size={24} color="#2560ff" />

              <View style={Styles.labelTextContainer}>
                <Text style={Styles.leftLabelText}>Mobile</Text>
                <Text style={Styles.rightLabelText}>+91 7032491730</Text>
              </View>
            </View>
          </View>
          <View style={Styles.listItemContainer}>
            <View style={Styles.listItemContentContainer}>
              <Ionicons name="time" size={24} color="#2560ff" />

              <View style={Styles.labelTextContainer}>
                <Text style={Styles.leftLabelText}>Date Of Birth</Text>
                <Text style={Styles.rightLabelText}>24-02-1998</Text>
              </View>
            </View>
          </View>
          <View style={Styles.listItemContainer}>
            <View style={Styles.listItemContentContainer}>
              <MaterialIcons name="info" size={24} color="#2560ff" />

              <View style={Styles.labelTextContainer}>
                <Text style={Styles.leftLabelText}>Country</Text>
                <Text style={Styles.rightLabelText}>India</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};
export default ProfileActivity;
