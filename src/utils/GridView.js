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
import GridStyles from '../useStyles/gridStyles';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const GridView = ({
  navigation,
  data,
  actionText,
  actionStyles,
  handleGetNoteData = () => {
    return null;
  },
}) => {
  return (
    <ScrollView>
      <SafeAreaView style={GridStyles?.gridContainer}>
        {data &&
          data?.length > 0 &&
          data?.map((each) => {
            return (
              <View key={each?.id} style={GridStyles.cardContainer}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#f3f4f6ff',
                    paddingHorizontal: 4,
                  }}
                >
                  <Text style={GridStyles.title}>{each?.title}</Text>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <TouchableOpacity>
                      <FontAwesome name="star-o" size={24} color="#edc900" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <FontAwesome name="star" size={24} color="#edc900" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <MaterialCommunityIcons name="file-restore" size={20} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <MaterialIcons name="delete" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Text style={GridStyles.noteData} numberOfLines={4}>
                    {each?.noteData}
                  </Text>
                </View>

                <View style={{ width: '100%' }}>
                  <TouchableOpacity
                    style={GridStyles.TouchableButton}
                    onPress={() => {
                      handleGetNoteData(each);
                    }}
                  >
                    <Text style={{ ...GridStyles.viewStyles, ...actionStyles }}>
                      {actionText ? actionText : 'View'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </SafeAreaView>
    </ScrollView>
  );
};
export default GridView;
