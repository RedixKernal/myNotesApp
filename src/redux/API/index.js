import {BASE_URL, API_HOST, API_KEY} from '../actionTypes/commonTypes';
import { collection, addDoc, query, where, getDocs} from "firebase/firestore"; 
import { store } from '../../config';
import axios from 'axios';

export const httpGET = async (val) => {
  return axios.post('https://r-notes-c655c-default-rtdb.firebaseio.com/',{
    ...val
  })
}

export const httpPOST = (val) => {
  return axios.post('https://r-notes-c655c-default-rtdb.firebaseio.com/',{
    ...val
  })
}

export const httpPUT = (val) => {
  return axios.put('https://r-notes-c655c-default-rtdb.firebaseio.com/',{
    ...val
  })
}

export const httpDELETE = (val) => {
  return axios.delete('https://r-notes-c655c-default-rtdb.firebaseio.com/',{
    ...val
  })
}



