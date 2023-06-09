import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { OAuth } from "../auth";
import { Image } from 'react-native'
import { SafeAreaView } from "react-native";

import HomeActivity from '../components/home/index';
// import ProfileActivity from '../components/profile/index';
import SettingActivity from '../components/settings/index';
// import AboutActivity from '../components/about/index';
import CreateNoteActivity from '../components/note/createNote';
import FavoriteActivity from '../components/favorite/index';
import TrashActivity from '../components/trash/index';

import SideDraWer from './SideDrawer';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
const Route = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function SideDraWerList() {
  return (
    <Drawer.Navigator screenOptions={{ 
      headerShown: false, 
      drawerStyle:{width:'70%'},
      drawerActiveBackgroundColor:'#1E64DDFF',
      drawerActiveTintColor:'#fff',
      drawerInactiveTintColor:'#1E64DDFF',
      drawerLabelStyle:{marginLeft:-20, fontWeight:'bold', fontSize:16} 
    }} 
      drawerContent={(props) => <SideDraWer {...props} 
    />
    }>
      <Drawer.Screen name="Dashboard" component={HomeActivity} options={{
        drawerIcon:({color}) => {
        return <MaterialCommunityIcons name="view-dashboard" size={24} color={color} />
        }
      }}/>
      <Drawer.Screen name="Create" component={CreateNoteActivity} options={{
        drawerIcon:({color}) => {
        return <MaterialCommunityIcons name="file-document-edit" size={24} color={color} />
        }
      }}/>
      <Drawer.Screen name="Favorite" component={FavoriteActivity} options={{
        drawerIcon:({color}) => {
        return <Octicons name="star-fill" size={24} color={color} />
        
        }
      }}/>
      <Drawer.Screen name="Trash" component={TrashActivity} options={{
        drawerIcon:({color}) => {
        return <MaterialCommunityIcons name="trash-can" size={24} color={color} />
        }
      }}/>
      <Drawer.Screen name="Setting" component={SettingActivity} options={{
        drawerIcon:({color}) => {
        return <Ionicons name="settings" size={24} color={color} />
        }
      }}/>
    </Drawer.Navigator>
  );
}

export default SideDraWerList;
