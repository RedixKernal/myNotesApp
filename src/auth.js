import react, { createContext, useState, useEffect } from 'react'
import { ref, set, update, onValue, remove } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from './config';
import { useDispatch, useSelector } from 'react-redux';
import { signinByUser, signoutByUser } from './redux/reducer/OAuth/index';
export const OAuth = createContext();

const AuthProvider = ({children}) => {
    const dispatch = useDispatch()
    const { isLoading, userData, errorMsg } = useSelector(({ Oauth }) => Oauth)
    const [isLogedIn, setisLogedIn] = useState(null);
    const [activeBottomTab, setActiveBottomTab] = useState(0);
    const [userDetails, setUserDetails] = useState(null);

    const handleSigninUser = (val) => {
        console.log("signin")
        // dispatch(signinByUser(val))
        setisLogedIn(true)
    }
    const handleSignoutUser = () => {
        console.log("signout")
        // dispatch(signoutByUser(userDetails))
        setisLogedIn(false)
    }
    // useEffect(() => {
    //     handleSetStorage()
    // },[isLoading, userData, errorMsg])

    // const handleSetStorage = async () => {
    //     const data = await AsyncStorage.getItem('@userdata')
    //     const details = JSON.parse(data);
    //     console.log(details,"userData details loco")
    //     setUserDetails(details)
    //     if(details?.id && !details?.isSignout){
    //         setisLogedIn(true)
    //     }else{
    //         setisLogedIn(false)
    //     }
    // }
    return (
        <OAuth.Provider value={{ handleSignoutUser, handleSigninUser, isLoading, setisLogedIn, isLogedIn, activeBottomTab, setActiveBottomTab, userDetails}}>
            {children}
        </OAuth.Provider>
    )
}
export default AuthProvider;