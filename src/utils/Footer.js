import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OAuth } from '../auth';
import * as ImagePicker from 'expo-image-picker';
import { addNewSecureImg } from '../redux/reducer/secureImg/index';
import { ref, set, update, onValue, remove, query, onChildAdded, push } from 'firebase/database';
import { db } from '../config';
import { useDispatch, useSelector } from 'react-redux';
function Footer({ navigation }) {
  const { activeBottomTab, setActiveBottomTab, userDetails } = useContext(OAuth);
  const dispatch = useDispatch();
  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
    });

    try {
      if (!pickerResult.canceled) {
        const uploadUrl = await uploadImageAsync(
          pickerResult.assets[0].uri,
          pickerResult.assets[0],
        );
        // console.log(uploadUrl,"if")
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function uploadImageAsync(uri, imgDetails) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        let reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.onload = function () {
          dispatch(
            addNewSecureImg({
              img: reader.result,
              data: { ...xhr.response?._data, ...imgDetails },
              userDetails: userDetails,
            }),
          );
          // const postListRef = ref(db, `/secureIMG/${userData.userName}/asset`);
          // const newPostRef = push(postListRef);
          // set(newPostRef, {
          //   img:reader.result,
          //   data:{...xhr.response?._data, ...imgDetails},
          //   id:newPostRef.key
          // }).then((data) => {
          //     // alert("success")
          //     console.log(data)
          // }).catch((er) => {
          //     // alert("error")
          //     console.log(er)
          // })
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    blob.close();
  }

  return (
    <SafeAreaView style={styles.footerContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
          setActiveBottomTab(0);
        }}
      >
        <Ionicons
          name={activeBottomTab === 0 ? 'ios-home' : 'ios-home-outline'}
          size={28}
          color={'#1E64DDFF'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={_pickImage}>
        <Ionicons name="md-add-circle" size={50} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
          setActiveBottomTab(1);
        }}
      >
        <Ionicons
          name={activeBottomTab === 1 ? 'ios-person-circle' : 'ios-person-circle-outline'}
          size={30}
          color={'#1E64DDFF'}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Footer;

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: -2,
    width: '100%',
    height: 60,
    borderBottomColor: '#dedede',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
});
