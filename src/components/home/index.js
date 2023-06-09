import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { OAuth } from '../../auth';
import Header from '../../utils/Header';
import Footer from '../../utils/Footer';
import { ref, set, update, onValue, remove } from 'firebase/database';
import { db } from '../../config';
import { getSecureImg } from '../../redux/reducer/secureImg/index';
import { useDispatch, useSelector } from 'react-redux';
import GridView from '../../utils/GridView';
import Styles from './styles';
import ToastMessage from '../../utils/ToastMessage';
import DialogBax from '../../utils/DialogBox';
const HomeActivity = ({ navigation }) => {
  const { userDetails } = useContext(OAuth);
  const dispatch = useDispatch();
  const { secureImgData } = useSelector(({ secureImg }) => secureImg);
  const [loader, setIsloader] = useState(false);
  const [dialogBox, setDialogBox] = useState(true);
  // {
  //     singleIMG:val
  //    }
  const notesData = [
    {
      id: 1,
      title: 'My_Note',
      noteData: 'this is my new data for testing the result',
    },
    {
      id: 2,
      title: 'My_Note2',
      noteData: '2this is my new data for testing the result',
    },
    {
      id: 3,
      title: 'My_Note',
      noteData: 'this is my new data for testing the result',
    },
    {
      id: 4,
      title: 'My_Note2',
      noteData:
        '2this is my new data for testing the result this is my new data for this is my new data for testing the resulthis is my new data for testing the resulthis is my new data for testing the resul testing the resul this is my new data for testing the resul',
    },
    {
      id: 5,
      title: 'My_Note',
      noteData: 'this is my new data for testing the result',
    },
    {
      id: 6,
      title: 'My_Note2',
      noteData: '2this is my new data for testing the result',
    },
    {
      id: 7,
      title: 'My_Note2',
      noteData: '2this is my new data for testing the result',
    },
    {
      id: 8,
      title: 'My_Note',
      noteData: 'this is my new data for testing the result',
    },
    {
      id: 9,
      title: 'My_Note2',
      noteData:
        '2this is my new data for testing the result this is my new data for this is my new data for testing the resulthis is my new data for testing the resulthis is my new data for testing the resul testing the resul this is my new data for testing the resul',
    },
    {
      id: 10,
      title: 'My_Note',
      noteData: 'this is my new data for testing the result',
    },
    {
      id: 66,
      title: 'My_Note2',
      noteData:
        '2this is my new data hjhnj nhjj nhhjjh nhjj nhjuhnj nhjuhn nhju njhj bjbjbhhgj bgjh nbjh bmngjh bjhgj bjkhjjh bjjh  for testing the result',
    },
  ];
  const handleGetNoteData = (data) => {
    console.log(data);
    navigation.navigate('Edit', {
      data: data,
    });
  };
  return (
    <SafeAreaView style={Styles.dashboardMainContainer}>
      {loader && (
        <ToastMessage message="Error Message" type="error" onClose={() => setIsloader(false)} />
      )}
      {dialogBox && (
        <DialogBax
          message="are you sure want to delete file / asset"
          onClose={() => setDialogBox(false)}
          onClick={() => setIsloader(true)}
        />
      )}
      <View style={Styles.headerView}>
        <Header navigation={navigation} />
      </View>
      <GridView data={notesData} actionText={'Views'} handleGetNoteData={handleGetNoteData} />
    </SafeAreaView>
  );
};
export default HomeActivity;
