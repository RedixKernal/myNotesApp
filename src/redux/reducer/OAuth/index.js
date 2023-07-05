import { createSlice } from '@reduxjs/toolkit';
import { httpGET } from '../../API/index';
import firebase from 'firebase/app';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { store } from '../../../config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  updatePassword,
} from 'firebase/auth';

const initialState = {
  userData: null,
  isLoading: false,
  errorMsg: null,
};

const OauthReducer = createSlice({
  name: 'Oauth',
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
    deleteCurrentUser: (state, action) => {
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

const { fetchStart, signinUser, updateUser, signoutUser, deleteCurrentUser, fetchError } =
  OauthReducer.actions;

export const createUser = (userData, callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    await createUserWithEmailAndPassword(
      auth,
      userData?.email,
      userData?.password,
      userData?.displayName,
    )
      .then((userCredential) => {
        console.log(userCredential);
        const obj = {
          userProviderData: {
            userData: {
              email: userData?.email,
              name: userData?.displayName,
            },
            meta: {
              name: userData?.displayName,
              email: userCredential?.user?.email,
              providerId: userCredential?.user.providerData?.map((item) => item?.providerId),
              uidm: userCredential?.user?.uid,
            },
            ifno: {
              appName: 'My_Notes_v1.0.4',
              emailVerified: userCredential?.user?.emailVerified,
              isAnonymous: userCredential?.user?.isAnonymous,
              uid: userCredential?.user?.uid,
              ...userCredential?.user?.metadata,
            },
          },
        };
        setDoc(doc(store, 'users', userCredential?.user?.uid), obj);
        setDoc(doc(store, 'notes', userCredential?.user?.uid), {
          allNotes: [],
          allFav: [],
          allTrash: [],
        });
        callBack({
          type: 'success',
          message: 'Account created successfully',
        });
      })
      .catch((error) => {
        callBack({
          type: 'error',
          message: error.message,
        });
      });
  };
};

export const signInUser = (userData, callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, userData?.email, userData?.password)
      .then((userCredential) => {
        callBack({
          type: 'success',
          message: 'SignIn successfully',
          userCredential: userCredential,
        });
      })
      .catch((error) => {
        callBack({
          type: 'error',
          message: error.message,
        });
      });
  };
};

export const signOutUser = (callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        callBack({
          type: 'success',
          message: 'SignOut successfully',
        });
      })
      .catch((error) => {
        callBack({
          type: 'error',
          message: error.message,
        });
      });
  };
};

export const updateUserProfile = (data, callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    const obj = {
      userProviderData: {
        userData: {
          ...data,
        },
        meta: {
          ...data,
          email: user?.email,
          providerId: user.providerData?.map((item) => item?.providerId),
          uidm: user?.uid,
        },
        ifno: {
          appName: 'My_Notes_v1.0.4',
          emailVerified: user?.emailVerified,
          isAnonymous: user?.isAnonymous,
          uid: user?.uid,
          ...user?.metadata,
        },
      },
    };
    await updateDoc(doc(store, 'users', user?.uid), obj)
      .then((res) => {
        callBack({
          type: 'success',
          message: 'Profile updated successfully',
        });
      })
      .catch((err) => {
        callBack({
          type: 'error',
          message: 'Failed to update profile',
        });
      });
  };
};

export const updateUserPassword = (data, callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    await updatePassword(user, data?.password)
      .then(() => {
        callBack({
          type: 'success',
          message: 'Password updated successfully',
        });
      })
      .catch((error) => {
        callBack({
          type: 'error',
          message: error.message,
        });
      });
  };
};

export const delUser = (callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    await deleteUser(user)
      .then(() => {
        deleteDoc(doc(store, 'users', user?.uid));
        deleteDoc(doc(store, 'notes', user?.uid));
        callBack({
          type: 'success',
          message: 'Account deleted successfully',
        });
      })
      .catch((error) => {
        callBack({
          type: 'error',
          message: error.message,
        });
      });
  };
};

export const getUserDetails = (callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(store, 'users', user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      callBack({
        type: 'success',
        message: 'User data fetch successfully',
        data: docSnap.data(),
      });
    } else {
      callBack({
        type: 'error',
        message: 'Document not found',
      });
    }
  };
};
