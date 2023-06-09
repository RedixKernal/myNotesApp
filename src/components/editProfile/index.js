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
// import { Ionicons } from '@expo/vector-icons';
// import { createUser } from '../../redux/reducer/OAuth/index';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
const EditProfileActivity = ({ navigation }) => {
  const { userDetails } = useContext(OAuth);
  const { secureImgData } = useSelector(({ secureImg }) => secureImg);
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    country: '',
    dob: '',
    mobile: '',
    email: '',
  };
  const handleCreateUser = (val) => {
    console.log(val);
    // const payload = {
    //     userName:val.userName,
    //     password:val.password,
    //     email:val.email,
    // }
    // dispatch(createUser(payload))
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
                  <View style={styles.uploadImageContainer}>
                    <View style={styles.uploadImageTextContainer}>
                      <Text style={styles.uploadImageText}>RK</Text>
                    </View>
                  </View>
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
                        <Text style={styles.formFieldLabelText}>Email</Text>
                      </View>
                      <View style={styles.formFieldInput}>
                        <FontAwesome5 name="mobile-alt" size={24} color="#1E64DDFF" />
                        <TextInput
                          style={styles.inputField}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values?.mobile}
                          placeholder="Enter Email"
                        />
                      </View>
                      <View>
                        {errors.email && <Text style={styles.helperText}>{errors.email}</Text>}
                      </View>
                    </View>

                    <View style={styles.formFieldContainer}>
                      <View style={styles.formFieldLabel}>
                        <Text style={styles.formFieldLabelText}>Date Of Birth</Text>
                      </View>
                      <View style={[styles.formFieldInput, { borderRadius: 6 }]}>
                        <MaterialCommunityIcons name="clock-time-three" size={24} color="#2560ff" />
                        <TextInput
                          style={styles.inputField}
                          onChangeText={handleChange('dob')}
                          onBlur={handleBlur('dob')}
                          value={values?.dob}
                          placeholder="Enter Date Of Birth"
                        />
                      </View>
                      <View>
                        {errors.dob && <Text style={styles.helperText}>{errors.dob}</Text>}
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
