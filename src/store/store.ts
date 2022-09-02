import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loadPokemonReducer from './slices/LoadPokemonSlice';
import pokemonReducer from './slices/PokemonDataSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  loadPokemon: loadPokemonReducer,
  pokemonList: pokemonReducer
})

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['loadPokemon']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: 
      {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
})
export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;