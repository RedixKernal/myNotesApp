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
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
const ProfileActivity = ({ navigation }) => {
  const { userDetails } = useContext(OAuth);
  const dispatch = useDispatch();
  const { data } = useSelector(({ notes }) => notes);
  const [loadingData, setLoadingdata] = useState(true);
  const [userData, setUserData] = useState({});
  const { getItem } = useAsyncStorage('@providerData');

  const readItemFromStorage = async () => {
    const item = await getItem();
    const data = JSON.parse(item);
    const info = data?.userProviderData;
    setUserData(info);
    setLoadingdata(false);
  };
  useEffect(() => {
    readItemFromStorage();
  }, [navigation, navigation.goBack]);
  console.log(userData, 'hjhj');

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
      {loadingData ? (
        <Text>Loading...</Text>
      ) : (
        <SafeAreaView style={Styles.safeAreaViewStyles}>
          <View style={Styles.securityContainer}>
            {/* <MaterialIcons name="security" size={30} color="green" /> */}
            {/* <Ionicons name="shield-checkmark-sharp" size={32} color="green" /> */}

            <View style={Styles.iconContainer}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                }}
              >
                {userData?.meta?.name
                  ? `${userData?.meta?.name?.split(' ')[0]?.charAt(0)?.toUpperCase() ?? ''}${
                      userData?.meta?.name?.split(' ')[1]?.charAt(0)?.toUpperCase() ?? ''
                    }`
                  : '--'}
              </Text>
            </View>
          </View>
          <View style={Styles.infoViewContainer}>
            {/* <MaterialIcons name="security" size={30} color="green" /> */}
            {/* <Ionicons name="shield-checkmark-sharp" size={32} color="green" /> */}

            <Text style={Styles.profileText}>
              {userData?.meta?.name ? userData?.meta?.name : '--'}
            </Text>
            <Text style={Styles.profileMailText}>
              {userData?.meta?.email ? userData?.meta?.email : '--'}
            </Text>
          </View>

          <View style={Styles.counterContainer}>
            {/* <MaterialIcons name="security" size={30} color="green" /> */}
            {/* <Ionicons name="shield-checkmark-sharp" size={32} color="green" /> */}

            <View style={Styles.allConutContainer}>
              <Text style={Styles.allConut}>{data?.allNotes?.length ?? 0}</Text>
              <Text style={Styles.countLabelText}>All</Text>
            </View>

            <View
              style={{
                ...Styles.allConutContainer,
                ...Styles.middleCounterContainer,
              }}
            >
              <Text style={Styles.allConut}>{data?.allFav?.length ?? 0}</Text>
              <Text style={Styles.countLabelText}>Favorite</Text>
            </View>

            <View style={Styles.allConutContainer}>
              <Text style={Styles.allConut}>{data?.allTrash?.length ?? 0}</Text>
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
                  <Text style={Styles.rightLabelText}>
                    {userData?.meta?.mobile ? userData?.meta?.mobile : '--'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={Styles.listItemContainer}>
              <View style={Styles.listItemContentContainer}>
                <Ionicons name="time" size={20} color="#2560ff" />

                <View style={Styles.labelTextContainer}>
                  <Text style={Styles.leftLabelText}>State</Text>
                  <Text style={Styles.rightLabelText}>
                    {userData?.meta?.state ? userData?.meta?.state : '--'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={Styles.listItemContainer}>
              <View style={Styles.listItemContentContainer}>
                <MaterialIcons name="info" size={20} color="#2560ff" />

                <View style={Styles.labelTextContainer}>
                  <Text style={Styles.leftLabelText}>Country</Text>
                  <Text style={Styles.rightLabelText}>
                    {userData?.meta?.country ? userData?.meta?.country : '--'}
                  </Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};
export default ProfileActivity;
