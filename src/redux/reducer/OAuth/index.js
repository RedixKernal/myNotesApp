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
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { setNotesData } from '../notes/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

// createUser method allow to user to create the identity for app
// by validate their user name and password
// and return the curent signed in user data
export const createUser = (userData, callBack) => {
  return async (dispatch) => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(
      auth,
      userData?.email,
      userData?.password,
      userData?.displayName,
    )
      .then((userCredential) => {
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
          status: 200,
        });
      })
      .catch((error) => {
        callBack({
          type: 'error',
          message: error.message,
          status: 404,
        });
      });
  };
};

// signInUser method allow to user to signed into the app
// by validate their user name and password
// and return the curent signed in user data
export const signInUser = (userData, callBack) => {
  return async (dispatch) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, userData?.email, userData?.password)
      .then((userCredential) => {
        callBack({
          type: 'success',
          message: 'SignIn successfully',
          userCredential: userCredential,
          status: 200,
        });
      })
      .catch((error) => {
        callBack({
          type: 'error',
          message: error.message,
          status: 404,
        });
      });
  };
};

// signOutUser method allow to user to signOut from the app
// by validate their user name and password
// and return the curent signed in usrer data as null
export const signOutUser = (callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        callBack({
          type: 'success',
          message: 'SignOut successfully',
          status: 200,
        });
      })
      .catch((error) => {
        callBack({
          type: 'error',
          message: error.message,
          status: 404,
        });
      });
  };
};

// updateUserProfile method allow to user to update or add user info
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

// updateUserPassword method allow to user can change the password
// by validate their old password and update the new password
export const updateUserPassword = (data, callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user?.email, 'user update');
    await signInWithEmailAndPassword(auth, user?.email, data?.oldPassword)
      .then((userCredential) => {
        const auth = getAuth();
        const user = auth.currentUser;
        updatePassword(user, data?.password)
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
      })
      .catch((error) => {
        callBack({
          type: 'error',
          message: error.message,
        });
      });
  };
};

// delUser method allow to user to delete the account from the app
// by validate their user name and password
// and return the curent signed in usrer data as null
export const delUser = (data, callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    await signInWithEmailAndPassword(auth, user?.email, data?.password)
      .then((userCredential) => {
        const auth = getAuth();
        const user = auth.currentUser;
        deleteUser(user)
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
      })
      .catch((error) => {
        callBack({
          type: 'error',
          message: error.message,
        });
      });
  };
};

// getUserDetails methos is allowed to use to get the details of current logedin user
// {
//   userProviderData:{
//     info:{},
//     meta:{},
//     userData:{}
//   }
// }
const setAllNotesData = async (data) => {
  try {
    const jsonInfo = JSON.stringify(data);
    await AsyncStorage.setItem('@notesStoreData', jsonInfo);
  } catch (e) {
    console.log(e);
  }
};

export const getUserDetails = (callBack) => {
  return async (dispatch) => {
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
        data: null,
      });
    }

    const docRefN = doc(store, 'notes', user?.uid);
    const docSnapN = await getDoc(docRefN);
    if (docSnapN.exists()) {
      dispatch(setNotesData(docSnapN.data()));
      setAllNotesData(docSnapN.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };
};

// ---------------------------------------------------------------------//

export const forgotPassword = (data, userData) => {
  return async (dispatch) => {
    console.log(data, 'signin beforef forget');
    dispatch(
      signInUser(data, (res) => {
        console.log('resinauth', res);
        if (res.status === 200) {
          dispatch(
            updateUserPassword(userData, (res) => {
              console.log('forget', res);
            }),
          );
        }
      }),
    );
  };
};
