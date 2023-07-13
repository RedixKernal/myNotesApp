import React, { useEffect, useContext, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './styles';
import { OAuth } from '../../auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { signInUser, getUserDetails } from '../../redux/reducer/OAuth/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastMessage from '../../utils/ToastMessage';
import DialogBax from '../../utils/DialogBox';
const LoginActivity = ({ navigation }) => {
  const dispatch = useDispatch();
  const { handleSigninUser } = useContext(OAuth);
  const [isLoader, setIsloader] = useState(false);
  const [toast, setToast] = useState({});
  const validationSchema = yup.object().shape({
    email: yup.string().required('Please enter user name'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Please enter password'),
  });

  const initialValues = {
    // email: '',
    // password: '',
    email: 'admin@gmail.com',
    password: 'admin@123',
  };

  const setuserData = async (res, info) => {
    try {
      const jsonInfo = JSON.stringify(info);
      const jsonValue = JSON.stringify(res?.userCredential);
      await AsyncStorage.setItem('@current_user', jsonValue);
      await AsyncStorage.setItem('@providerData', jsonInfo);
      handleSigninUser(res);
    } catch (e) {
      console.log(e);
    }
  };
  const handleFormSubmit = (val) => {
    const payload = {
      password: val.password,
      email: val.email,
    };
    dispatch(
      signInUser(payload, (data) => {
        if (data) {
          setToast(data);
          setIsloader(true);
        }
        setTimeout(() => {
          setIsloader(false);
        }, 3000);
        dispatch(
          getUserDetails((res) => {
            setuserData(data, res.data);
          }),
        );
      }),
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {isLoader && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setIsloader(false)}
        />
      )}

      <ScrollView>
        <SafeAreaView style={styles.main}>
          <View style={styles.profileImageStyles}>
            <Image source={require('../../assets/appLogo/appLogo.png')} style={styles.imageLogo} />
          </View>
          <View style={styles.welcomeText}>
            <Text style={styles.intro}>Hey, {`Redix`}</Text>
            <Text style={styles.welBack}>Welcome Back!</Text>
          </View>
          <Formik
            enableReintialize="true"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={styles.formContainer}>
                <View style={styles.formFieldContainer}>
                  <View style={styles.formFieldLabel}>
                    <Text style={styles.formFieldLabelText}>Email</Text>
                  </View>
                  <View style={styles.formFieldInput}>
                    <Ionicons name="person-circle-outline" size={26} color="#1E64DDFF" />
                    <TextInput
                      style={styles.inputField}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values?.email}
                      placeholder="Enter user name"
                    />
                  </View>
                  <View>
                    {errors.email && <Text style={styles.helperText}>{errors.email}</Text>}
                  </View>
                </View>

                <View style={styles.formFieldContainer}>
                  <View style={styles.formFieldLabel}>
                    <Text style={styles.formFieldLabelText}>Password</Text>
                  </View>
                  <View style={[styles.formFieldInput, { borderRadius: 6 }]}>
                    <MaterialCommunityIcons
                      name="form-textbox-password"
                      size={26}
                      color="#1E64DDFF"
                    />
                    <TextInput
                      style={styles.inputField}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values?.password}
                      placeholder="Enter password"
                    />
                  </View>
                  <View>
                    {errors.password && <Text style={styles.helperText}>{errors.password}</Text>}
                  </View>
                </View>

                <View style={styles.forgotContainer}>
                  <TouchableOpacity>
                    <View>
                      <Text style={styles.forgotText}>Forgot password?</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.signinButtonContainer}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.signinButton}>
                      <Text style={styles.signinButtonText}>Sign in</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.forgotContainer}>
                  <Text style={styles.orText}>OR</Text>
                </View>

                <View style={[styles.signinButtonContainer, { backgroundColor: '#DB4437FF' }]}>
                  <TouchableOpacity>
                    <View style={styles.signinButton}>
                      <FontAwesome
                        name="google-plus-circle"
                        size={24}
                        color="#fff"
                        style={{ marginHorizontal: 10 }}
                      />
                      <Text style={styles.signinButtonText}>Continue with Google</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          <View style={styles.buttonContainer}>
            <View style={styles.signupButton}>
              <Text style={styles.signupButtonFirstText}>Don't have an account</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUpActivity')}>
                <Text style={styles.signupButtonsignupText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LoginActivity;
