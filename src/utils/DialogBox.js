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

function DialogBax({
  message = null,
  onClose = () => null,
  onClick = () => null,
  closeBtnText,
  conformBtnText,
}) {
  return (
    <SafeAreaView style={styles.tosat_Container_Overly}>
      <View style={styles.tosat_Container}>
        <View style={{ ...styles.tosat_MsgViewr }}>
          <View style={styles.textWidth}>{message}</View>
          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={() => onClose()} style={styles.cancelActionButton}>
              <Text style={styles.color_white}>{closeBtnText ? closeBtnText : 'Cancel'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClick()} style={styles.conformActionButton}>
              <Text style={styles.color_black}>{conformBtnText ? conformBtnText : 'Conform'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default DialogBax;

const styles = StyleSheet.create({
  tosat_Container_Overly: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 8,
    backgroundColor: '#00000034',
    width: '100%',
    height: '100%',
  },
  tosat_Container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
    marginVertical: 300,
    // backgroundColor:'red',
  },
  tosat_MsgViewr: {
    marginRight: 4,
    width: '80%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  messageTitle: {
    marginHorizontal: 10,
    color: 'black',
    fontFamily: 'Poppins',
    letterSpacing: 1,
    fontSize: 15,
  },
  actionContainer: {
    // borderWidth:1,
    paddingHorizontal: 8,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  cancelActionButton: {
    borderWidth: 1,
    borderColor: '#ff7575',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 4,
    borderRadius: 4,
    fontFamily: 'Poppins',
    backgroundColor: '#ff7580',
    color: 'white',
  },
  conformActionButton: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 4,
    borderRadius: 4,
    fontFamily: 'Poppins',
    backgroundColor: '#f1f1f1',
  },

  textWidth: {
    width: '100%',
    paddingHorizontal: 10,
  },
  color_white: {
    color: 'white',
  },
  color_black: {
    color: 'black',
  },
});
