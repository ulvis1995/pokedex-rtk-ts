import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loadPokemonReducer from './slices/LoadPokemonSlice';
import pokemonReducer from './slices/PokemonDataSlice';
import typeReducer from './slices/TypesSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  loadPokemon: loadPokemonReducer,
  pokemonList: pokemonReducer,
  types: typeReducer
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['pokemonList', 'types']
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