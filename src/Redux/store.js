import { configureStore } from '@reduxjs/toolkit';
import statReducer from './reducer';

const store = configureStore({
    reducer: {
        stat : statReducer,
    }
})

export default store

