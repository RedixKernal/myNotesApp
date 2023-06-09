import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../reducer/index';

const store = configureStore({
    reducer:reducer
})
export default store;