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
  arrayUnion,
  arrayRemove,
  increment,
} from 'firebase/firestore';
import { store } from '../../../config';
import { getAuth } from 'firebase/auth';

const initialState = {
  data: [],
  notesIsLoading: false,
  notesErrorMsg: null,
};

const NotesReducer = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
      state.errorMsg = null;
    },
    getNotesData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    fetchError: (state, action) => {
      state.errorMsg = action.payload;
      state.isLoading = false;
    },
  },
});

export default NotesReducer.reducer;

const { fetchStart, getNotesData, fetchError } = NotesReducer.actions;

const getUniqueId = () => {
  const value = '123456780';
  let uniqueId = '';
  for (let i = 0; i <= 8; i++) {
    uniqueId += value[Math.floor(Math.random() * value.length)];
  }
  return uniqueId;
};
export const handleNote = (data, callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(store, 'notes', user?.uid);
    const docSnap = await getDoc(docRef);
    console.log(data);
    if (docSnap.exists()) {
      const allNotesData = docSnap.data()?.allNotes;
      if (data?.id && data?.isFav) {
        const newData = docSnap.data()?.allFav;
        const modifiedData = newData?.map((each) => {
          if (each?.id === data?.id) {
            return {
              id: each?.id,
              noteInfo: data?.noteInfo,
              noteTitle: data?.noteTitle,
            };
          } else {
            return each;
          }
        });
        await updateDoc(doc(store, 'notes', user?.uid), {
          allFav: modifiedData,
        })
          .then(() => {
            dispatch(handlegetAllNote());
            callBack({
              type: 'success',
              message: 'Note updated successfully',
              id: data?.id,
            });
          })
          .catch((e) => {
            callBack({
              type: 'error',
              message: 'Somthing went worng',
              id: length,
            });
          });
      } else {
        if (data?.id) {
          console.log(data, 'iff');
          const newData = docSnap.data()?.allNotes;
          const modifiedData = newData?.map((each) => {
            if (each?.id === data?.id) {
              return {
                id: each?.id,
                noteInfo: data?.noteInfo,
                noteTitle: data?.noteTitle,
              };
            } else {
              return each;
            }
          });
          await updateDoc(doc(store, 'notes', user?.uid), {
            allNotes: modifiedData,
          })
            .then(() => {
              dispatch(handlegetAllNote());
              callBack({
                type: 'success',
                message: 'Note updated successfully',
                id: data?.id,
              });
            })
            .catch((e) => {
              callBack({
                type: 'error',
                message: 'Somthing went worng',
                id: length,
              });
            });
        } else {
          // console.log(data, 'elese');
          const uniqueId = Number(getUniqueId());
          const obj = {
            ...data,
            id: uniqueId,
          };

          await updateDoc(doc(store, 'notes', user?.uid), {
            allNotes: arrayUnion(obj),
          })
            .then(() => {
              dispatch(handlegetAllNote());
              callBack({
                type: 'success',
                message: 'Note created successfully',
                id: uniqueId,
              });
            })
            .catch((e) => {
              callBack({
                type: 'error',
                message: 'Somthing went worng',
                id: uniqueId,
              });
            });
        }
      }
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };
};

export const handlegetAllNote = () => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(store, 'notes', user?.uid);
    console.log('getnotes');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(getNotesData(docSnap.data()));
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };
};

export const handleAddToFavoriteFromAllNotes = (data, callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(store, 'notes', user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      await updateDoc(doc(store, 'notes', user?.uid), {
        allFav: arrayUnion(data),
      }).then(async () => {
        await updateDoc(doc(store, 'notes', user?.uid), {
          allNotes: arrayRemove(data),
        }).then(() => {
          callBack({
            type: 'success',
            message: 'Added To Favorite',
          });
          dispatch(handlegetAllNote());
        });
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };
};

export const handleAddToTrashFromAllNotes = (data, callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(store, 'notes', user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      await updateDoc(doc(store, 'notes', user?.uid), {
        allTrash: arrayUnion(data),
      }).then(async () => {
        await updateDoc(doc(store, 'notes', user?.uid), {
          allNotes: arrayRemove(data),
        }).then(() => {
          callBack({
            type: 'success',
            message: 'Added To Trash',
          });
          dispatch(handlegetAllNote());
        });
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };
};

export const handleAddToAllNotesFromFavNotes = (data, callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(store, 'notes', user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      await updateDoc(doc(store, 'notes', user?.uid), {
        allNotes: arrayUnion(data),
      }).then(async () => {
        await updateDoc(doc(store, 'notes', user?.uid), {
          allFav: arrayRemove(data),
        }).then(() => {
          callBack({
            type: 'success',
            message: 'Note UnFavorited',
          });
          dispatch(handlegetAllNote());
        });
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };
};

export const handleAddToTrashFromFavNotes = (data, callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(store, 'notes', user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      await updateDoc(doc(store, 'notes', user?.uid), {
        allTrash: arrayUnion(data),
      }).then(async () => {
        await updateDoc(doc(store, 'notes', user?.uid), {
          allFav: arrayRemove(data),
        }).then(() => {
          callBack({
            type: 'success',
            message: 'Added To Trash',
          });
          dispatch(handlegetAllNote());
        });
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };
};

export const handleRestoreFromTrash = (data, callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(store, 'notes', user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      await updateDoc(doc(store, 'notes', user?.uid), {
        allNotes: arrayUnion(data),
      }).then(async () => {
        await updateDoc(doc(store, 'notes', user?.uid), {
          allTrash: arrayRemove(data),
        }).then(() => {
          callBack({
            type: 'success',
            message: 'Note Restored',
          });
          dispatch(handlegetAllNote());
        });
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };
};

export const handleDeleteFromTrash = (data, callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(store, 'notes', user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      await updateDoc(doc(store, 'notes', user?.uid), {
        allTrash: arrayRemove(data),
      }).then(async () => {
        callBack({
          type: 'success',
          message: 'Note Permanently Deleted',
        });
        dispatch(handlegetAllNote());
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };
};

export const handleDeleteAllFromTrash = (callBack) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(store, 'notes', user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      await updateDoc(doc(store, 'notes', user?.uid), {
        allTrash: [],
      }).then(async () => {
        callBack({
          type: 'success',
          message: 'All Notes Permanently Deleted',
        });
        dispatch(handlegetAllNote());
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };
};
