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
  actions = () => {
    return null;
  },
  handleGetNoteData = () => {
    return null;
  },
}) => {
  return (
    <View key={data?.id} style={GridStyles.cardContainer}>
      <View style={GridStyles.content_container_grid}>
        <Text style={GridStyles.title}>{data?.noteTitle}</Text>
        <View style={GridStyles.action_content}>{actions(data)}</View>
      </View>

      <View>
        <Text style={GridStyles.noteData} numberOfLines={4}>
          {data?.noteInfo}
        </Text>
      </View>

      <View style={GridStyles.fullWidth}>
        <TouchableOpacity
          style={GridStyles.TouchableButton}
          onPress={() => {
            handleGetNoteData(data);
          }}
        >
          <Text style={{ ...GridStyles.viewStyles, ...actionStyles }}>
            {actionText ? actionText : 'View'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default GridView;
