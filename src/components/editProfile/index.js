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
import { updateUserProfile } from '../../redux/reducer/OAuth/index';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const EditProfileActivity = ({ navigation }) => {
  const { userDetails } = useContext(OAuth);
  const { secureImgData } = useSelector(({ secureImg }) => secureImg);
  const [profileImage, setProfileImage] = useState('');
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    country: '',
    state: '',
    mobile: '',
  };

  const profileImagePicker = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.1,
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
  const handleCreateUser = (val) => {
    const payload = {
      name: val?.name,
      profileImage: profileImage,
      country: val?.country,
      state: val?.state,
      mobile: val?.mobile,
    };
    dispatch(
      updateUserProfile(payload, (res) => {
        console.log(res?.message);
        navigation.goBack();
      }),
    );
  };
  return (
    <SafeAreaView style={styles.dashboardMainContainer}>
      <View style={styles.headerView}>
        <BackHeader navigation={navigation} activityText="Edit Profile" />
      </View>
      <SafeAreaView style={styles.scrollViewContainer}>
        <SafeAreaView>
          <Formik
            enableReintialize="true"
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={(values) => handleCreateUser(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <ScrollView>
                <View style={styles.formContainer}>
                  <TouchableOpacity onPress={profileImagePicker}>
                    <View style={styles.uploadImageContainer}>
                      <Ionicons name="camera" size={24} style={styles.cameraIcon} />
                      <View style={styles.uploadImageTextContainer}>
                        <Text style={styles.uploadImageText}>RK</Text>
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
                        <MaterialCommunityIcons name="clock-time-three" size={24} color="#2560ff" />
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
                        {errors.country && <Text style={styles.helperText}>{errors.country}</Text>}
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
    </SafeAreaView>
  );
};
export default EditProfileActivity;
