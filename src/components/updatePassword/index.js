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
import BackHeader from '../../utils/BackHeader';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { updateUserPassword } from '../../redux/reducer/OAuth/index';
import * as Yup from 'yup';

const UpdatePasswordActivity = ({ navigation }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Password is required'),
    password: Yup.string().required('Password is required').min(6),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm password must match'),
  });
  const initialValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };
  const handleUpdatePassword = (val) => {
    const payload = {
      oldPassword: val?.oldPassword,
      password: val.password,
    };
    dispatch(
      updateUserPassword(payload, (res) => {
        console.log(res?.message);
        navigation.goBack();
      }),
    );
  };
  return (
    <SafeAreaView style={styles.dashboardMainContainer}>
      <View style={styles.headerView}>
        <BackHeader
          navigation={navigation}
          goToBack={() => {
            navigation.goBack();
          }}
          activityText="Update Password"
        />
      </View>
      <SafeAreaView
        style={{
          width: '100%',
          height: '90%',
          padding: 6,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <SafeAreaView>
          <Formik
            enableReintialize="true"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdatePassword(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={styles.formContainer}>
                <View>
                  <View style={styles.formFieldContainer}>
                    <View style={styles.formFieldLabel}>
                      <Text style={styles.formFieldLabelText}>Old Password</Text>
                    </View>
                    <View style={styles.formFieldInput}>
                      <MaterialCommunityIcons name="security" size={24} color="#2560ff" />
                      <TextInput
                        style={styles.inputField}
                        onChangeText={handleChange('oldPassword')}
                        onBlur={handleBlur('oldPassword')}
                        value={values?.oldPassword}
                        placeholder="Enter Old Password"
                      />
                    </View>
                    <View>
                      {errors.oldPassword && (
                        <Text style={styles.helperText}>{errors.oldPassword}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.formFieldContainer}>
                    <View style={styles.formFieldLabel}>
                      <Text style={styles.formFieldLabelText}>New Password</Text>
                    </View>
                    <View style={styles.formFieldInput}>
                      <MaterialIcons name="privacy-tip" size={24} color="#2560ff" />
                      <TextInput
                        style={styles.inputField}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values?.password}
                        placeholder="Enter New Password"
                      />
                    </View>
                    <View>
                      {errors.password && <Text style={styles.helperText}>{errors.password}</Text>}
                    </View>
                  </View>

                  <View style={styles.formFieldContainer}>
                    <View style={styles.formFieldLabel}>
                      <Text style={styles.formFieldLabelText}>Conform Password</Text>
                    </View>
                    <View style={[styles.formFieldInput, { borderRadius: 6 }]}>
                      <Ionicons name="checkmark-circle" size={24} color="#2560ff" />
                      <TextInput
                        style={styles.inputField}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values?.confirmPassword}
                        placeholder="Enter Confirm Password"
                      />
                    </View>
                    <View>
                      {errors.confirmPassword && (
                        <Text style={styles.helperText}>{errors.confirmPassword}</Text>
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.signinButtonContainer}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.signinButton}>
                      <Text style={styles.signinButtonText}>Update</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};
export default UpdatePasswordActivity;
