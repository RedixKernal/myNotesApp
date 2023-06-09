import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './styles';
import { OAuth } from '../../auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const LoginActivity = ({ navigation }) => {
  const { handleSigninUser } = useContext(OAuth);
  const validationSchema = yup.object().shape({
    userName: yup.string().required('Please enter user name'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Please enter password'),
  });

  const initialValues = {
    userName: 'Admin',
    password: 'Admin12',
  };

  const handleFormSubmit = (val) => {
    handleSigninUser(val);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
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
                    <Text style={styles.formFieldLabelText}>User Name</Text>
                  </View>
                  <View style={styles.formFieldInput}>
                    <Ionicons name="person-circle-outline" size={26} color="#1E64DDFF" />
                    <TextInput
                      style={styles.inputField}
                      onChangeText={handleChange('userName')}
                      onBlur={handleBlur('userName')}
                      value={values?.userName}
                      placeholder="Enter user name"
                    />
                  </View>
                  <View>
                    {errors.userName && <Text style={styles.helperText}>{errors.userName}</Text>}
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
