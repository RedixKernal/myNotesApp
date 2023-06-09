import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Icons } from '../assets/Icons/index';
import { OAuth } from '../auth';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
function Header({ navigation }) {
  const { userDetails } = useContext(OAuth);
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <View style={styles.menu}>
          <MaterialCommunityIcons name="menu-open" size={26} color="blue" />
        </View>
      </TouchableOpacity>

      <View style={styles.menu}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Create');
          }}
        >
          <MaterialIcons name="add-circle" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: '96%',
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowColor: '#000',
    elevation: 3,
    borderRadius: 8,
  },
  menu: {
    margin: 10,
  },
});
