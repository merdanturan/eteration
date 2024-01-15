import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import {thunk} from 'redux-thunk';
import cartReducer from './cartSlice'
import { dataReducer } from './dataSlice';
import searchReducer from './searchSlice';
import filterReducer from './filterSlice';
import sortReducer from './sortSlice';


const reducers = combineReducers({
    cart: cartReducer,
    data: dataReducer,
    search: searchReducer,
    filter: filterReducer,
    sort: sortReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
        return [thunk]
    },
});

export default store;