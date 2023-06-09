import { createSlice } from "@reduxjs/toolkit";
import { httpGET } from "../../API/index";
import firebase from "firebase/app";
import { collection, addDoc, query, where, getDocs, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../../../config";
const initialState = {
  secureImgData: null,
  isLoading: false,
  errorMsg: null,
};

const secureImgReducer = createSlice({
  name: "secureImg",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
      state.errorMsg = null;
    },
    secureImage: (state, action) => {
      state.secureImgData = action.payload;
      state.isLoading = true;
      state.errorMsg = null;
    },
    fetchError: (state, action) => {
      state.errorMsg = action.payload;
      state.isLoading = false;
    },
  },
});

export default secureImgReducer.reducer;

const { fetchStart, secureImage, fetchError } =
secureImgReducer.actions;

export const addNewSecureImg = (imgData) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    console.log(imgData,"imgData")
    await updateDoc(doc(store, "users", imgData.userDetails?.id), {
      assets: arrayUnion({
        img:imgData.img,
        data:imgData.data,
      })
    });
  };
};

export const getSecureImg = (userData) => {
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
        console.log(userDetails,"userDetailsuserDetails")
        dispatch(secureImage(userDetails));
          // dispatch(signinUser(userDetails));
          // AsyncStorage.setItem("@userdata", JSON.stringify(userDetails));
        });
      })
      .catch((err) => {
        dispatch(fetchError(err));
      });
  };
};

