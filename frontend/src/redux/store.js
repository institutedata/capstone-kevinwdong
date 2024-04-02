import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import postReducer from "./postSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  post: postReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  
})

export const persistor = persistStore(store)
