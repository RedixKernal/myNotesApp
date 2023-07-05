import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
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
import { Formik } from 'formik';
import * as yup from 'yup';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { handleNote } from '../../redux/reducer/notes';
const EditNoteActivity = ({ route, navigation }) => {
  const { userDetails } = useContext(OAuth);
  const { data } = route?.params;
  const dispatch = useDispatch();
  const [storeDocId, setStoreDocId] = useState('');
  const { secureImgData } = useSelector(({ secureImg }) => secureImg);
  const validationSchema = yup.object().shape({
    userName: yup.string().required('Please enter user name'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Please enter password'),
  });
  const initialValues = {
    noteTitle: data?.noteTitle ? data?.noteTitle : '',
    noteInfo: data?.noteInfo ? data?.noteInfo : '',
  };
  const handleFormSubmit = (data) => {
    const payload = {
      noteTitle: data?.noteTitle,
      noteInfo: data?.noteInfo,
      id: storeDocId ? storeDocId : undefined,
    };
    dispatch(
      handleNote(payload, (res) => {
        setStoreDocId(res?.id);
        console.log(res?.message);
      }),
    );
  };
  useEffect(() => {
    setStoreDocId(data?.id);
  }, [navigation]);

  return (
    <SafeAreaView style={Styles.dashboardMainContainer}>
      <Formik
        enableReintialize="true"
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <View style={Styles.headerView}>
              <BackHeader
                navigation={navigation}
                activityText="Note"
                leftAction={() => {
                  return (
                    <TouchableOpacity onPress={handleSubmit}>
                      <View>
                        <MaterialCommunityIcons name="content-save-edit" size={24} color="blue" />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <ScrollView>
              <KeyboardAvoidingView style={Styles.avoidingKeyBoard}>
                <View>
                  <TextInput
                    style={Styles.titleInput}
                    onChangeText={handleChange('noteTitle')}
                    onBlur={handleBlur('noteTitle')}
                    value={values?.noteTitle}
                    placeholder="Title"
                    selectionColor={'green'}
                  />

                  <TextInput
                    style={Styles.noteInfo}
                    onChangeText={handleChange('noteInfo')}
                    onBlur={handleBlur('noteInfo')}
                    value={values?.noteInfo}
                    placeholder="Enter Somthing..."
                    multiline={true}
                    selectionColor={'gray'}
                  />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};
export default EditNoteActivity;
