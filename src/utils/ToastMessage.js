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

function ToastMessage({ message, type, onClose = () => null }) {
  return (
    <SafeAreaView style={styles.tosat_Container_Overly}>
      <View style={styles.tosat_Container}>
        <View
          style={{
            ...styles.tosat_MsgViewr,
            backgroundColor:
              type === 'error'
                ? 'red'
                : type === 'success'
                ? 'green'
                : type === 'warning'
                ? 'gray'
                : '#dedede',
          }}
        >
          <View>
            <Text style={styles.messageText} numberOfLines={2}>
              {message ? message : '-...'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => onClose()}>
            <Ionicons name="close" size={28} color="white" style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ToastMessage;

const styles = StyleSheet.create({
  tosat_Container_Overly: {
    position: 'absolute',
    zIndex: 10,
    // backgroundColor: '#fff',
    width: '100%',
    // height: '100%',
  },
  tosat_Container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    height: 100,
  },
  tosat_MsgViewr: {
    marginRight: 4,
    width: '70%',
    height: 64,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageText: {
    marginLeft: 10,
    color: 'white',
    fontFamily: 'Poppins',
    letterSpacing: 1,
    fontSize: 15,
  },
  closeIcon: {
    marginRight: 15,
    color: 'white',
    fontFamily: 'Poppins',
    letterSpacing: 1,
    fontSize: 20,
  },
});
