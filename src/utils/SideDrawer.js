import React, { useState, useContext, useEffect } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { signoutByUser } from '../redux/reducer/OAuth/index';
import { OAuth } from '../auth';
function SideDraWer(props) {
  const { handleSignoutUser, userDetails } = useContext(OAuth);
  const dispatch = useDispatch();
  const handleFormSubmit = () => {
    handleSignoutUser();
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.sideDrawerImageContainer}>
          {userDetails?.imgURL ? (
            <Image
              source={{
                uri: userDetails?.imgURL,
              }}
              style={styles.sideDrawerImage}
            />
          ) : (
            <View style={styles.sideDrawerProfileTextContainer}>
              <Text style={styles.sideDrawerProfileText}>
                {/* {userDetails?.userName.charAt(0).toUpperCase()} */}
                RK
              </Text>
            </View>
          )}
          <View style={styles.sideDrawerUserNameContainer}>
            <Text style={styles.sideDrawerUserNameText}>
              {/* {userDetails?.userName} */}
              Redix
            </Text>
            <Text>
              {/* {userDetails?.email ? userDetails?.email : "Testmail@co.in"} */}
              RedixInfo@gmail.com
            </Text>
          </View>
        </View>
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.sideDrawerOptionalMenuContainer}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.sideDrawerOptionalMenuItemContainer}>
            <MaterialCommunityIcons
              name="account-remove"
              size={24}
              color="red"
              style={{ marginHorizontal: 6 }}
            />
            <Text style={styles.sideDrawerDeleteAccountText}>Delete account</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFormSubmit}>
          <View style={styles.sideDrawerOptionalMenuItemContainer}>
            <FontAwesome name="sign-out" size={24} color="gray" style={{ marginHorizontal: 10 }} />
            <Text style={styles.sideDrawerSignOutText}>Signout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SideDraWer;

const styles = StyleSheet.create({
  sideDrawerImageContainer: { padding: 20, flex: 1, flexDirection: 'row', alignItems: 'center' },
  sideDrawerImage: { width: 60, height: 60, borderRadius: 50 },
  sideDrawerProfileTextContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#dedede',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideDrawerProfileText: { fontSize: 25, fontWeight: 'bold' },
  sideDrawerUserNameContainer: { padding: 10 },
  sideDrawerUserNameText: { fontWeight: 'bold', fontSize: 20 },
  sideDrawerOptionalMenuContainer: { borderTopWidth: 2, borderTopColor: '#F3F4F6FF', margin: 10 },
  sideDrawerOptionalMenuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
    paddingVertical: 10,
  },
  sideDrawerDeleteAccountText: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 16,
    marginHorizontal: 4,
  },
  sideDrawerSignOutText: { fontWeight: 'bold', fontSize: 16 },
});
