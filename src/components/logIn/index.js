import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './styles';
import { OAuth } from '../../auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { signInUser, getUserDetails, forgotPassword } from '../../redux/reducer/OAuth/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastMessage from '../../utils/ToastMessage';
import DialogBax from '../../utils/DialogBox';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
const LoginActivity = ({ navigation }) => {
  const dispatch = useDispatch();
  const { handleSigninUser } = useContext(OAuth);
  const [isLoader, setIsloader] = useState(false);
  const [toast, setToast] = useState({});
  const [storeUser, setStoreUser] = useState(null);
  const [dialogBox, setDialogBox] = useState(false);

  const [Fconnectdata, setFconnectdata] = useState({
    email: '',
    fpassword: '',
    fconform: '',
  });

  const validationSchema = yup.object().shape({
    email: yup.string().required('Please enter user name'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Please enter password'),
  });

  const initialValues = {
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
      signInUser(payload, async (data) => {
        if (data) {
          setToast(data);
          setIsloader(true);
        }
        setTimeout(() => {
          setIsloader(false);
          setToast(null);
        }, 3000);

        if (data?.status === 200) {
          await AsyncStorage.setItem('@storeAuth', JSON.stringify(val));
          dispatch(
            getUserDetails((res) => {
              setuserData(data, res.data);
            }),
          );
        }
      }),
    );
  };

  const getUserStoreData = async () => {
    const getStoreuserdata = await AsyncStorage.getItem('@storeUser');
    if (getStoreuserdata) {
      const data = JSON.parse(getStoreuserdata);
      setStoreUser(data?.userProviderData);
    }
  };

  useEffect(() => {
    getUserStoreData();
  }, []);

  const validationSchemaF = yup.object({
    email: yup.string().required('email is required'),
    password: yup.string().required('Password is required').min(6),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password'), null], 'Confirm password must match'),
  });
  const initialValuesF = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const handleForgotPassword = async (val) => {
    const getStoreuserdata = await AsyncStorage.getItem('@storeAuth');
    if (getStoreuserdata) {
      const data = JSON.parse(getStoreuserdata);
      dispatch(forgotPassword(data, val));
      console.log('yes clicked...', val);
    }
  };

  const handleDeleteDialog = () => {
    // setPassword('');
    setDialogBox(true);
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

      {dialogBox && (
        <DialogBax
          conformBtnText={'Submit'}
          noActions={true}
          getStyles={{
            height: 350,
            marginVertical: 220,
          }}
          message={
            <SafeAreaView>
              <Formik
                enableReintialize="true"
                initialValues={initialValuesF}
                validationSchema={validationSchemaF}
                onSubmit={(values) => handleForgotPassword(values)}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                  <View style={styles.formContainer}>
                    <View style={styles.formFieldLabel}>
                      <Text style={styles.formFieldLabelText}>Forgot Password</Text>
                    </View>
                    <View>
                      <View style={styles.formFieldContainer}>
                        {/* <View style={styles.formFieldLabel}>
                          <Text style={styles.formFieldLabelText}></Text>
                        </View> */}
                        <View style={styles.formFieldInput}>
                          {/* <MaterialCommunityIcons name="security" size={24} color="#2560ff" /> */}
                          {/* <MaterialCommunityIcons name="onepassword" size={24} color="#2560ff" /> */}
                          {/* <Ionicons name="warning" size={24} color="#BD0232" /> */}
                          <TextInput
                            style={styles.inputField}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values?.oldPassword}
                            placeholder="Enter Email"
                          />
                        </View>
                        <View>
                          {errors.email && <Text style={styles.helperText}>{errors.email}</Text>}
                        </View>
                      </View>

                      <View style={styles.formFieldContainer}>
                        {/* <View style={styles.formFieldLabel}>
                          <Text style={styles.formFieldLabelText}>New Password</Text>
                        </View> */}
                        <View style={styles.formFieldInput}>
                          {/* <MaterialIcons name="privacy-tip" size={24} color="#2560ff" /> */}
                          {/* <MaterialIcons name="lock" size={24} color="#1E64DDFF" /> */}
                          <TextInput
                            style={styles.inputField}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values?.password}
                            placeholder="Enter New Password"
                          />
                        </View>
                        <View>
                          {errors.password && (
                            <Text style={styles.helperText}>{errors.password}</Text>
                          )}
                        </View>
                      </View>

                      <View style={styles.formFieldContainer}>
                        {/* <View style={styles.formFieldLabel}>
                          <Text style={styles.formFieldLabelText}>Conform Password</Text>
                        </View> */}
                        <View style={[styles.formFieldInput, { borderRadius: 6 }]}>
                          {/* <Ionicons name="checkmark-circle" size={24} color="#2560ff" /> */}
                          {/* <MaterialCommunityIcons name="lock-check" size={25} color="#1E64DDFF" /> */}
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

                    <View
                      style={{
                        ...styles.signinButtonContainer,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        justifyContent: 'flex-end',
                      }}
                    >
                      <TouchableOpacity onPress={() => setDialogBox(false)}>
                        <View
                          style={{
                            // ...styles.signinButton,
                            backgroundColor: '#dedede',
                            margin: 4,
                            padding: 8,
                            paddingHorizontal: 12,
                            borderRadius: 4,
                          }}
                        >
                          <Text
                            style={{
                              ...styles.signinButtonText,
                              fontSize: 12,
                              fontWeight: 'normal',
                              color: 'black',
                            }}
                          >
                            Cancel
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleSubmit}>
                        <View
                          style={{
                            // ...styles.signinButton,
                            backgroundColor: '#DE0243',
                            margin: 4,
                            padding: 8,
                            paddingHorizontal: 12,
                            borderRadius: 4,
                          }}
                        >
                          <Text
                            style={{
                              ...styles.signinButtonText,
                              fontSize: 12,
                              fontWeight: 'normal',
                            }}
                          >
                            Submit
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </SafeAreaView>
          }
          onClose={() => setDialogBox(false)}
          onClick={() => handleForgotPassword()}
        />
      )}

      <ScrollView>
        <SafeAreaView style={styles.main}>
          <View style={styles.profileImageStyles}>
            <Image source={require('../../assets/appLogo/appLogo.png')} style={styles.imageLogo} />
          </View>
          {storeUser?.meta?.name ? (
            <View style={styles.welcomeText}>
              <Text style={styles.intro}>
                Hey, {storeUser?.meta?.name ? storeUser?.meta?.name : 'user'}
              </Text>
              <Text style={styles.welBack}>Welcome Back!</Text>
            </View>
          ) : (
            <View style={styles.welcomeText}>
              <Text style={styles.intro}>Welcome To</Text>
              <Text style={styles.welBack}>My Notes</Text>
            </View>
          )}
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
                    <MaterialIcons name="mail" size={24} color="#1E64DDFF" />
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
                    <MaterialIcons name="lock" size={24} color="#1E64DDFF" />
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

                {/* <View style={styles.forgotContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      handleDeleteDialog();
                    }}
                  >
                    <View>
                      <Text style={styles.forgotText}>Forgot password?</Text>
                    </View>
                  </TouchableOpacity>
                </View> */}

                <View style={styles.signinButtonContainer}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.signinButton}>
                      <Text style={styles.signinButtonText}>Sign in</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* <View style={styles.forgotContainer}>
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
                </View> */}
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
