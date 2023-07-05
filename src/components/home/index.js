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
import {
  handleAddToFavoriteFromAllNotes,
  handleAddToTrashFromAllNotes,
} from '../../redux/reducer/notes/index';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const HomeActivity = ({ navigation }) => {
  const { userDetails } = useContext(OAuth);
  const dispatch = useDispatch();
  const { data } = useSelector(({ notes }) => notes);
  const [loader, setIsloader] = useState(false);
  const [dialogBox, setDialogBox] = useState(true);

  const [notesAllData, setNotesAllData] = useState([]);

  const handleGetNoteData = (data) => {
    console.log(data);
    navigation.navigate('Edit', {
      data: data,
    });
  };

  const handleFavorite = (data) => {
    dispatch(handleAddToFavoriteFromAllNotes(data));
  };
  const handleDelete = (data) => {
    dispatch(handleAddToTrashFromAllNotes(data));
  };

  useEffect(() => {
    setNotesAllData(data?.allNotes);
    console.log('log here', data);
  }, [data]);

  return (
    <SafeAreaView style={Styles.dashboardMainContainer}>
      {/* {loader && (
        <ToastMessage message="Error Message" type="error" onClose={() => setIsloader(false)} />
      )}
      {dialogBox && (
        <DialogBax
          message="are you sure want to delete file / asset"
          onClose={() => setDialogBox(false)}
          onClick={() => setIsloader(true)}
        />
      )} */}
      <View style={Styles.headerView}>
        <Header navigation={navigation} />
      </View>
      <ScrollView>
        <SafeAreaView style={Styles?.gridContainer}>
          {notesAllData &&
            notesAllData?.length > 0 &&
            notesAllData?.map((item) => {
              return (
                <GridView
                  data={item}
                  key={item?.id}
                  actionText={'View'}
                  handleGetNoteData={handleGetNoteData}
                  actions={(val) => {
                    return (
                      <>
                        <TouchableOpacity onPress={() => handleFavorite(val)}>
                          <FontAwesome name="star-o" size={20} color="#edc900" />
                        </TouchableOpacity>
                        {/* <TouchableOpacity>
                          <FontAwesome name="star" size={20} color="#edc900" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <MaterialCommunityIcons name="file-restore" size={20} color="green" />
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => handleDelete(val)}>
                          <MaterialIcons name="delete" size={20} color="red" />
                        </TouchableOpacity>
                      </>
                    );
                  }}
                />
              );
            })}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeActivity;
