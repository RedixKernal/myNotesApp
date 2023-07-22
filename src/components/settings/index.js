import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
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
import { signOutUser, delUser } from '../../redux/reducer/OAuth/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastMessage from '../../utils/ToastMessage';
import DialogBax from '../../utils/DialogBox';
import { setNotesData } from '../../redux/reducer/notes/index';
const SettingActivity = ({ navigation }) => {
  const { handleSignoutUser, userDetails, deleteUserData } = useContext(OAuth);
  const dispatch = useDispatch();
  const [isLoader, setIsloader] = useState(false);
  const [toast, setToast] = useState({});
  const [dialogBox, setDialogBox] = useState(false);
  const [password, setPassword] = useState();
  const removeuserData = async (res) => {
    try {
      await AsyncStorage.removeItem('@current_user');
      await AsyncStorage.removeItem('@notesStoreData');
      dispatch(setNotesData([]));
      setDialogBox(false);
      handleSignoutUser(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteUser = () => {
    const payload = {
      password: password,
    };
    dispatch(
      delUser(payload, (data) => {
        removeuserData(data);
      }),
    );
  };

  const handleDeleteDialog = () => {
    setPassword('');
    setDialogBox(true);
  };

  return (
    <SafeAreaView style={Styles.dashboardMainContainer}>
      {dialogBox && (
        <DialogBax
          conformBtnText={'Verify'}
          message={
            <View>
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 8,
                  marginHorizontal: 4,
                }}
              >
                Verify Account
              </Text>
              <TextInput
                // style={styles.inputField}
                style={{
                  borderWidth: 1,
                  borderColor: '#dedede',
                  borderRadius: 6,
                  paddingVertical: 6,
                  paddingHorizontal: 10,

                  // width: '80%',
                }}
                onChangeText={(val) => {
                  setPassword(val);
                }}
                onBlur={(val) => {
                  setPassword(val);
                }}
                value={password}
                placeholder="Enter Password"
              />
            </View>
          }
          onClose={() => setDialogBox(false)}
          onClick={() => handleDeleteUser()}
        />
      )}
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

        <TouchableOpacity onPress={handleDeleteDialog}>
          <SafeAreaView style={Styles.dialog_text}>
            <View style={Styles.sideDrawerOptionalMenuItemContainer}>
              <MaterialCommunityIcons
                name="account-remove"
                size={24}
                color="#fff"
                style={Styles.margin_hor}
              />
              <Text style={Styles.sideDrawerDeleteAccountText}>Delete account</Text>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};
export default SettingActivity;
