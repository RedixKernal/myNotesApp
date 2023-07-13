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
import BackHeader from '../../utils/BackHeader';
import { ref, set, update, onValue, remove } from 'firebase/database';
import { db } from '../../config';
import { getSecureImg } from '../../redux/reducer/secureImg/index';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { Formik } from 'formik';
import { updateUserProfile, getUserDetails } from '../../redux/reducer/OAuth/index';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import ToastMessage from '../../utils/ToastMessage';
import DialogBax from '../../utils/DialogBox';
import * as Yup from 'yup';
const EditProfileActivity = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState('');
  const [loadingData, setLoadingdata] = useState(true);
  const [isLoader, setIsloader] = useState(false);
  const [toast, setToast] = useState({});
  const validationSchema = Yup.object({
    name: Yup.string().required('User name is required'),
  });
  const [initialValues, setinitialValues] = useState({
    name: '',
    country: '',
    state: '',
    mobile: '',
  });
  const [userData, setUserData] = useState({});
  const { getItem } = useAsyncStorage('@providerData');
  const dispatch = useDispatch();

  const readItemFromStorage = async () => {
    const item = await getItem();
    const data = JSON.parse(item);
    const info = data?.userProviderData?.meta;
    setinitialValues({
      name: info?.name,
      country: info?.country,
      state: info?.state,
      mobile: info?.mobile,
    });
    setUserData(info);
    setLoadingdata(false);
  };
  useEffect(() => {
    readItemFromStorage();
  }, [navigation]);

  const profileImagePicker = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    try {
      if (!pickerResult.canceled) {
        await uploadImageAsync(pickerResult.assets[0].uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        let reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.onload = function () {
          setProfileImage(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      };
      xhr.onerror = function (e) {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    blob.close();
  }

  const providerData = async (res) => {
    try {
      const jsonValue = JSON.stringify(res);
      await AsyncStorage.setItem('@providerData', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateUser = (val) => {
    const payload = {
      name: val?.name,
      // profileImage: profileImage,
      country: val?.country,
      state: val?.state,
      mobile: val?.mobile,
    };
    dispatch(
      updateUserProfile(payload, (res) => {
        // console.log(res?.message);
        setToast(res);
        setIsloader(true);
        setTimeout(() => {
          setIsloader(false);
        }, 3000);
        dispatch(
          getUserDetails((res) => {
            // console.log(res.data);
            providerData(res.data);
            // navigation.goBack();
            navigation.navigate('Setting');
          }),
        );
      }),
    );
  };

  return (
    <SafeAreaView style={styles.dashboardMainContainer}>
      {isLoader && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setIsloader(false)}
        />
      )}
      <View style={styles.headerView}>
        <BackHeader
          navigation={navigation}
          goToBack={() => {
            navigation.goBack();
          }}
          activityText="Edit Profile"
        />
      </View>
      {loadingData ? (
        <Text>Loading...</Text>
      ) : (
        <SafeAreaView style={styles.scrollViewContainer}>
          <SafeAreaView>
            <Formik
              enableReintialize="true"
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleCreateUser(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <ScrollView>
                  <View style={styles.formContainer}>
                    <TouchableOpacity
                    // onPress={profileImagePicker}
                    >
                      <View style={styles.uploadImageContainer}>
                        {/* <Ionicons name="camera" size={24} style={styles.cameraIcon} /> */}
                        <View style={styles.uploadImageTextContainer}>
                          <Text style={styles.uploadImageText}>
                            {userData?.name
                              ? `${userData?.name?.split(' ')[0]?.charAt(0)?.toUpperCase() ?? ''}${
                                  userData?.name?.split(' ')[1]?.charAt(0)?.toUpperCase() ?? ''
                                }`
                              : 'Redix Kernal'}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View>
                      <View style={styles.formFieldContainer}>
                        <View style={styles.formFieldLabel}>
                          <Text style={styles.formFieldLabelText}>Name</Text>
                        </View>
                        <View style={styles.formFieldInput}>
                          <Ionicons name="person-circle-outline" size={26} color="#1E64DDFF" />
                          <TextInput
                            style={styles.inputField}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values?.name}
                            placeholder="Enter Name"
                          />
                        </View>
                        <View>
                          {errors.name && <Text style={styles.helperText}>{errors.name}</Text>}
                        </View>
                      </View>

                      <View style={styles.formFieldContainer}>
                        <View style={styles.formFieldLabel}>
                          <Text style={styles.formFieldLabelText}>Mobile</Text>
                        </View>
                        <View style={styles.formFieldInput}>
                          <FontAwesome5 name="mobile-alt" size={24} color="#1E64DDFF" />
                          <TextInput
                            style={styles.inputField}
                            onChangeText={handleChange('mobile')}
                            onBlur={handleBlur('mobile')}
                            value={values?.mobile}
                            placeholder="Enter Mobile Number"
                          />
                        </View>
                        <View>
                          {errors.mobile && <Text style={styles.helperText}>{errors.mobile}</Text>}
                        </View>
                      </View>

                      <View style={styles.formFieldContainer}>
                        <View style={styles.formFieldLabel}>
                          <Text style={styles.formFieldLabelText}>State</Text>
                        </View>
                        <View style={[styles.formFieldInput, { borderRadius: 6 }]}>
                          <MaterialCommunityIcons
                            name="clock-time-three"
                            size={24}
                            color="#2560ff"
                          />
                          <TextInput
                            style={styles.inputField}
                            onChangeText={handleChange('state')}
                            onBlur={handleBlur('state')}
                            value={values?.state}
                            placeholder="Enter State"
                          />
                        </View>
                        <View>
                          {errors.state && <Text style={styles.helperText}>{errors.state}</Text>}
                        </View>
                      </View>

                      <View style={styles.formFieldContainer}>
                        <View style={styles.formFieldLabel}>
                          <Text style={styles.formFieldLabelText}>Country</Text>
                        </View>
                        <View style={styles.formFieldInput}>
                          <Ionicons name="flag" size={24} color="#2560ff" />
                          <TextInput
                            style={styles.inputField}
                            onChangeText={handleChange('country')}
                            onBlur={handleBlur('country')}
                            value={values?.country}
                            placeholder="Enter Country"
                          />
                        </View>
                        <View>
                          {errors.country && (
                            <Text style={styles.helperText}>{errors.country}</Text>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={styles.signinButtonContainer}>
                      <TouchableOpacity onPress={handleSubmit}>
                        <View style={styles.signinButton}>
                          <Text style={styles.signinButtonText}>Save changes</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              )}
            </Formik>
          </SafeAreaView>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};
export default EditProfileActivity;
