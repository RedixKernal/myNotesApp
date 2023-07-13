import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Formik } from 'formik';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/reducer/OAuth/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import ToastMessage from '../../utils/ToastMessage';
import DialogBax from '../../utils/DialogBox';
import * as Yup from 'yup';
const SignUpActivity = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isLoader, setIsloader] = useState(false);
  const [toast, setToast] = useState({});
  const validationSchema = Yup.object({
    userName: Yup.string().required('User name is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required').min(6),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm password must match'),
  });
  const initialValues = {
    userName: '',
    password: '',
    confirmPassword: '',
    email: '',
  };
  const handleCreateUser = (val) => {
    const payload = {
      displayName: val.userName,
      password: val.password,
      email: val.email,
    };
    dispatch(
      createUser(payload, (res) => {
        // console.log(res?.message);
        if (res) {
          setToast(res);
          setIsloader(true);
        }
        setTimeout(() => {
          setIsloader(false);
          res.type !== 'error' && navigation.navigate('LoginActivity');
        }, 3000);
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
          <Formik
            enableReintialize="true"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleCreateUser(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={styles.formContainer}>
                <View style={styles.formFieldContainer}>
                  <View style={styles.formFieldLabel}>
                    <Text style={styles.formFieldLabelText}>User Name</Text>
                  </View>
                  <View style={styles.formFieldInput}>
                    <Ionicons name="person-circle-outline" size={24} color="#1E64DDFF" />
                    <TextInput
                      style={styles.inputField}
                      onChangeText={handleChange('userName')}
                      onBlur={handleBlur('userName')}
                      value={values?.userName}
                      placeholder="Enter userName"
                    />
                  </View>
                  <View>
                    {errors.userName && <Text style={styles.helperText}>{errors.userName}</Text>}
                  </View>
                </View>

                <View style={styles.formFieldContainer}>
                  <View style={styles.formFieldLabel}>
                    <Text style={styles.formFieldLabelText}>Email</Text>
                  </View>
                  <View style={styles.formFieldInput}>
                    <Entypo name="email" size={24} color="#1E64DDFF" />
                    <TextInput
                      style={styles.inputField}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values?.email}
                      placeholder="Enter email"
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
                  <View style={styles.formFieldInput}>
                    <FontAwesome5 name="mobile-alt" size={24} color="#1E64DDFF" />
                    <TextInput
                      style={styles.inputField}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values?.password}
                      placeholder="Enter Password"
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
                    <MaterialCommunityIcons
                      name="form-textbox-password"
                      size={26}
                      color="#1E64DDFF"
                    />
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

                <View style={styles.signinButtonContainer}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.signinButton}>
                      <Text style={styles.signinButtonText}>Sign up</Text>
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
              <Text style={styles.signupButtonFirstText}>Already have an account</Text>
              <TouchableOpacity onPress={() => navigation.navigate('LoginActivity')}>
                <Text style={styles.signupButtonsignupText}>Login here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUpActivity;
