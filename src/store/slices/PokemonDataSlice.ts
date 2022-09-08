import { createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios';
import { isError } from "../../functions/isErrorForSlice";
import { pokemonDataResponse } from "../../functions/pokemonDataResponse";
import { reduceArrayPokemonsStore } from "../../functions/reduceArray";
import { PokemonResponse, pokemonListState, PokemonStore } from "../../types/pokemonType";

const initialState: pokemonListState = {
  pokemonList: [],
  currentPokemon: '',
  search: null,
  error: '',
  isLoading: false,
  compare: []
}

export const fetchPokemonItem = createAsyncThunk
  <PokemonResponse, string | number, {rejectValue: string}>(
  'pokemonList/fetchPokemon',
  async function (name, {rejectWithValue}) {
    try {
      const response = await axios.get<PokemonResponse>(
        `https://pokeapi.co/api/v2/pokemon/${name}`, 
        {headers: {'Content-Type': 'application/json'}})
            
      const data = response.data
      return data
    } catch (error: any) {
      if (!error.response) {throw error}
      return rejectWithValue('Pokemon not found')
    }
  }  
)

const pokemonSlice = createSlice ({
  name: 'pokemonList',
  initialState,
  reducers: {
    choosePokemon(state, action) {
      state.currentPokemon = action.payload
    },
    searchPokemon (state, action) {
      state.search = action.payload ? action.payload : null
    },
    addPokemon (state, action) {
      state.pokemonList = reduceArrayPokemonsStore(
        [...state.pokemonList, action.payload])
    },
    addPokemonToCompare (state, action) {
      state.compare = [...state.compare, action.payload]
      .reduce((res: string[], poke) => {
        if (!res.find(i => i === poke)) {res.push(poke)}
        return res
      }, [])
    },
    removePokemonCompare (state, action){
      const removeEl = state.compare.findIndex(i => i === action.payload)
      state.compare.splice(removeEl, 1)
    },
    removeAllPokemonCompare (state){
      state.compare = []
    },
    loadingState(state) {
      state.isLoading = false
    }
  },
  extraReducers: builder =>  {builder
    .addCase (fetchPokemonItem.fulfilled, (state, action: PayloadAction<PokemonResponse>) => {        
      state.isLoading = false;
      state.error = '';
      state.pokemonList = reduceArrayPokemonsStore(
        [...state.pokemonList, pokemonDataResponse(action.payload)])
    })
    .addCase (fetchPokemonItem.pending, (state) => {
      state.isLoading = true;
      state.error = ''
    })
    .addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false
    })
  },
})

export const {
  choosePokemon, addPokemon, loadingState, 
  addPokemonToCompare, searchPokemon,
  removePokemonCompare, removeAllPokemonCompare
} = pokemonSlice.actions;
export default pokemonSlice.reducer;