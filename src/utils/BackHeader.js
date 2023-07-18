import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { OAuth } from '../auth';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
function BackHeader({
  navigation,
  sideMenu,
  activityText,
  leftAction = () => {
    return null;
  },
  goToBack = () => {
    return null;
  },
}) {
  const { userDetails } = useContext(OAuth);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerPannel}>
        {sideMenu ? (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View style={styles.menu}>
              <MaterialCommunityIcons name="menu-open" size={26} color="blue" />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              goToBack();
            }}
          >
            <View style={styles.menu}>
              <AntDesign name="back" size={24} color="blue" />
            </View>
          </TouchableOpacity>
        )}

        <Text style={styles.pannelText}>{activityText}</Text>
      </View>
      <View style={styles.menu}>{leftAction()}</View>
    </View>
  );
}

export default BackHeader;

const styles = StyleSheet.create({
  headerContainer: {
    // margin:10,
    width: '96%',
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowColor: '#000',
    elevation: 3,
    borderRadius: 8,
    // borderWidth:1,
    // borderColor:'#dedede',
  },
  headerPannel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pannelText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  menu: {
    margin: 10,
    padding: 4,
    // borderWidth:1,
    // borderRadius:3,
  },
  inputContainer: {
    width: '80%',
    height: 40,
    backgroundColor: '#dedede',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4,
  },
  input: {
    // marginVertical: 4,
    width: '80%',
    height: 40,
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 12,
  },
  profile: {
    margin: 20,
    width: 40,
    height: 40,
    marginEnd: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
