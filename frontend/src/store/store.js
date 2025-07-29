import {configureStore} from '@reduxjs/toolkit';
import scannerReducer from '../slices/scannerSlice';
import registerReducer from '../slices/registerSlice';

const store = configureStore({
    reducer:{
        scanner: scannerReducer,
        register: registerReducer
    }
}); 

export default store;