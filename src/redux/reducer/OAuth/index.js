import { createSlice } from "@reduxjs/toolkit";
import { httpGET } from "../../API/index";
import firebase from "firebase/app";
import { collection, addDoc, query, where, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../../../config";
const initialState = {
  userData: null,
  isLoading: false,
  errorMsg: null,
};

const OauthReducer = createSlice({
  name: "Oauth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
      state.errorMsg = null;
    },
    signinUser: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
      state.errorMsg = null;
    },
    signoutUser: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
      state.errorMsg = null;
    },
    updateUser: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
      state.errorMsg = null;
    },
    deleteUser: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
      state.errorMsg = null;
    },
    fetchError: (state, action) => {
      state.errorMsg = action.payload;
      state.isLoading = false;
    },
  },
});

export default OauthReducer.reducer;

const { fetchStart, signinUser, updateUser, signoutUser, deleteUser, fetchError } =
  OauthReducer.actions;

export const signinByUser = (userData) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    console.log('userData',userData)
    const oAuth = query(
      collection(store, "users"),
      where("userName", "==", userData?.userName),
      where("password", "==", userData?.password)
    );
    await getDocs(oAuth)
      .then((data) => {
        data.docs.forEach((doc) => {
          const userDetails = {
            ...doc.data(),
            id: doc.id,
          };
          dispatch(signinUser(userDetails));
          AsyncStorage.setItem("@userdata", JSON.stringify(userDetails));
        });
      })
      .catch((err) => {
        dispatch(fetchError(err));
      });
  };
};

export const signoutByUser = (userData) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const oAuth = query(
      collection(store, "users"),
      where("userName", "==", userData?.userName),
      where("password", "==", userData?.password)
    );
    await getDocs(oAuth)
      .then(() => {
        dispatch(signoutUser({ isSignout: true }));
        AsyncStorage.setItem("@userdata", JSON.stringify({...userData,isSignout:true}));
      })
      .catch((err) => {
        dispatch(fetchError(err));
      });
  };
};

export const createUser = (userData) => {
  return async (dispatch) => {
    dispatch(fetchStart());

    await addDoc(collection(store, "users"), userData)
      .then((data) => {
        console.log(data?.docRef, "data?.docRef?.id");
      })
      .catch((err) => {
        dispatch(fetchError(err));
      });
  };
};

export const updateByUser = (userData, userDetails) => {
  
  return async (dispatch) => {
    dispatch(fetchStart());
    console.log(userData,"userDetails, userData", userDetails)
    await updateDoc(doc(store, "users", userDetails?.id), {...userData, 
      password:userDetails.password,
      userName:userDetails.userName
    });
    await AsyncStorage.setItem("@userdata", JSON.stringify({...userData, 
      password:userDetails.password,
      userName:userDetails.userName,
      isSignout:false
    }));
    dispatch(updateUser({...userData, 
      password:userDetails.password,
      userName:userDetails.userName
    }))
  };
};

export const deleteByUser = () => {};
