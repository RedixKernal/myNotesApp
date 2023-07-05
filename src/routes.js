import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OAuth } from './auth';
import { SafeAreaView } from 'react-native';
import LoginActivity from './components/logIn/index';
import SignUpActivity from './components/signUp/index';
import SideDraWerList from './utils/sideDraWerList';
import UpdatePasswordActivity from './components/updatePassword';
import ProfileActivity from './components/profile/index';
import EditProfileActivity from './components/editProfile/index';
import EditNoteActivity from './components/note/editNote';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { handlegetAllNote } from './redux/reducer/notes/index';
import { useDispatch, useSelector } from 'react-redux';
const Route = createNativeStackNavigator();

const AppRoutes = () => {
  const { isLogedIn } = useContext(OAuth);
  const [value, setValue] = useState('value');
  const { getItem } = useAsyncStorage('@current_user');
  const dispatch = useDispatch();
  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item);
  };

  useEffect(() => {
    readItemFromStorage();
  }, [isLogedIn]);
  useEffect(() => {
    dispatch(handlegetAllNote());
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
      />
      {value ? (
        <>
          <NavigationContainer>
            <Route.Navigator>
              <Route.Group screenOptions={{ headerShown: false }}>
                <Route.Screen name="Root" component={SideDraWerList} />
                <Route.Screen name="UpdatePassword" component={UpdatePasswordActivity} />
                <Route.Screen name="Profile" component={ProfileActivity} />
                <Route.Screen name="EditProfile" component={EditProfileActivity} />
                <Route.Screen name="Edit" component={EditNoteActivity} />
              </Route.Group>
            </Route.Navigator>
          </NavigationContainer>
        </>
      ) : (
        <NavigationContainer>
          <Route.Navigator>
            <Route.Group screenOptions={{ headerShown: false }}>
              <Route.Screen name="LoginActivity" component={LoginActivity} />
              <Route.Screen name="SignUpActivity" component={SignUpActivity} />
            </Route.Group>
          </Route.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
};
export default AppRoutes;
