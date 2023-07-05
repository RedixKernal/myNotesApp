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
import BackHeader from '../../utils/BackHeader';
import Footer from '../../utils/Footer';
import { ref, set, update, onValue, remove } from 'firebase/database';
import { db } from '../../config';
import { getSecureImg } from '../../redux/reducer/secureImg/index';
import { useDispatch, useSelector } from 'react-redux';
import GridView from '../../utils/GridView';
import Styles from './styles';
import {
  handleAddToAllNotesFromFavNotes,
  handleAddToTrashFromFavNotes,
} from '../../redux/reducer/notes/index';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const FavoriteActivity = ({ navigation }) => {
  const { userDetails } = useContext(OAuth);
  const dispatch = useDispatch();
  const { data } = useSelector(({ notes }) => notes);
  const [notesAllData, setNotesAllData] = useState([]);

  const handleGetNoteData = (data) => {
    console.log(data);
    navigation.navigate('Edit', {
      data: data,
    });
  };

  const handleUnFavorite = (data) => {
    dispatch(handleAddToAllNotesFromFavNotes(data));
  };
  const handleDelete = (data) => {
    dispatch(handleAddToTrashFromFavNotes(data));
  };

  useEffect(() => {
    setNotesAllData(data?.allFav);
  }, [data]);

  return (
    <SafeAreaView style={Styles.dashboardMainContainer}>
      <View style={Styles.headerView}>
        <BackHeader navigation={navigation} sideMenu={true} activityText="Favorite" />
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
                  actionStyles={{
                    backgroundColor: '#eeca00',
                  }}
                  handleGetNoteData={handleGetNoteData}
                  actions={(val) => {
                    return (
                      <>
                        {/* <TouchableOpacity >
                          <FontAwesome name="star-o" size={20} color="#edc900" />
                        </TouchableOpacity > */}
                        <TouchableOpacity onPress={() => handleUnFavorite(val)}>
                          <FontAwesome name="star" size={20} color="#edc900" />
                        </TouchableOpacity>
                        {/*  <TouchableOpacity>
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
export default FavoriteActivity;
