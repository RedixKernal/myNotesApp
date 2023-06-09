import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { OAuth } from "./auth";
import { SafeAreaView } from "react-native";
import LoginActivity from "./components/logIn/index";
import SignUpActivity from "./components/signUp/index";
import ViewImageActivity from "./components/ViewImageActivity";
import SideDraWerList from "./utils/sideDraWerList";

// import HomeActivity from "./components/home/index";
// import ProfileActivity from './components/profile/index';
// import SettingActivity from './components/settings/index';
// import AboutActivity from './components/about/index';
import UpdatePasswordActivity from './components/updatePassword';
import ProfileActivity from './components/profile/index';
import EditProfileActivity from './components/editProfile/index';
import EditNoteActivity from './components/note/editNote';
const Route = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AppRoutes = () => {
  const { isLogedIn } = useContext(OAuth);
  console.log(isLogedIn, "isLogedIn");
  return (
    <SafeAreaView style={{ flex: 1, }}>
      {isLogedIn ? (
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
