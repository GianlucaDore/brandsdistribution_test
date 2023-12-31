import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pokeReducer from './pokeSlice.js'
import { persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const combinedReducer = combineReducers({
    poke: pokeReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})