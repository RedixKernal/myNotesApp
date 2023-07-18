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
  handlegetAllNote,
} from '../../redux/reducer/notes/index';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const HomeActivity = ({ navigation }) => {
  const { userDetails } = useContext(OAuth);
  const dispatch = useDispatch();
  const { data } = useSelector(({ notes }) => notes);
  const [isLoader, setIsloader] = useState(false);
  const [toast, setToast] = useState({});
  const [dialogBox, setDialogBox] = useState(true);

  const [notesAllData, setNotesAllData] = useState([]);

  const handleGetNoteData = (data) => {
    console.log(data);
    navigation.navigate('Edit', {
      data: data,
    });
  };

  const handleFavorite = (data) => {
    dispatch(
      handleAddToFavoriteFromAllNotes(data, (res) => {
        setToast(res);
        setIsloader(true);
        setTimeout(() => {
          setIsloader(false);
        }, 3000);
      }),
    );
  };
  const handleDelete = (data) => {
    dispatch(
      handleAddToTrashFromAllNotes(data, (res) => {
        setToast(res);
        setIsloader(true);
        setTimeout(() => {
          setIsloader(false);
        }, 3000);
      }),
    );
  };

  useEffect(() => {
    setNotesAllData(data?.allNotes);
  }, [data]);
  useEffect(() => {
    dispatch(handlegetAllNote());
  }, []);

  return (
    <SafeAreaView style={Styles.dashboardMainContainer}>
      {isLoader && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setIsloader(false)}
        />
      )}
      {/* {dialogBox && (
        <DialogBax
          message="are you sure want to delete file / asset"
          onClose={() => setDialogBox(false)}
          onClick={() => setIsloader(true)}
        />
      )} */}
      <View style={Styles.headerView}>
        <Header navigation={navigation} activityText={'Home'} />
      </View>
      <ScrollView>
        <SafeAreaView style={Styles?.gridContainer}>
          {notesAllData && notesAllData?.length > 0 ? (
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
            })
          ) : (
            <View style={Styles.fav_no_found}>
              <Entypo name="emoji-sad" size={40} color="#0300d740" />
              <Text>No Notes</Text>
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeActivity;
