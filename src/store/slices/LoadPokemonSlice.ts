import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { isError } from "../../functions/isErrorForSlice";
import { reduceArrayPokemons } from "../../functions/reduceArray";
import { loadPokemonResponse, loadPokemonState, Results } from '../../types/loadPokemonAndFilter';

const initialState: loadPokemonState = {
  isLoadingFirst: false,
  isLoadingMore: false,
  error: '',
  next: null,
  previous: null,
  count: null,
  results: []
}

export const fetchloadPokemon = createAsyncThunk
  <loadPokemonResponse, undefined, {rejectValue: string}>(
  'loadPokemon/fetchloadPokemon',
  async function (_, {rejectWithValue}) {
    try {
      const response = await axios.get<loadPokemonResponse>(`https://pokeapi.co/api/v2/pokemon/`, 
        {headers: {'Content-Type': 'application/json'}})
  
      const count = response.data.count;
      const next = response.data.next;
      const previous = response.data.previous;
      const results = response.data.results;
      return {count, next, previous, results}
    } catch (error: any) {
      if (!error.response) {throw error}
      return rejectWithValue('Not found')
    }
  }  
)

export const fetchloadPokemonMore = createAsyncThunk
  <loadPokemonResponse, string | null, {rejectValue: string}>(
  'loadPokemon/fetchloadPokemonMore',
  async function (url, {rejectWithValue}) {
    try {
      const response: any  = await axios.get<loadPokemonResponse>(`${url}`, 
        {headers: {'Content-Type': 'application/json'}})

      const count = response.data.count;
      const next = response.data.next;
      const previous = response.data.previous;
      const results = response.data.results;
      return {count, next, previous, results}
    } catch (error: any) {
      if (!error.response) {throw error}
      return rejectWithValue('Not found')
    }
  }
)

const loadPokemonSlice = createSlice ({
  name: 'loadPokemon',
  initialState,
  reducers: {},
  extraReducers: builder =>  {builder
    .addCase(fetchloadPokemon.pending, (state) => {
      state.isLoadingFirst = true;
      state.error = ''; 
    })
    .addCase(fetchloadPokemonMore.pending, (state) => {
      state.isLoadingMore = true;
      state.error = ''; 
    })
    .addCase (fetchloadPokemon.fulfilled, (state, action) => {
      state.isLoadingFirst = false; 
      state.error = ''; 
      state.count = action.payload.count;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      state.results = reduceArrayPokemons([...state.results, ...action.payload.results])
    })
    .addCase (fetchloadPokemonMore.fulfilled, (state, action) => {
      state.isLoadingMore = false; 
      state.error = ''; 
      state.count = action.payload.count;
      state.next = action.payload.next;
      state.previous = action.payload.previous;        
      state.results = reduceArrayPokemons([...state.results, ...action.payload.results])
    })
    .addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoadingFirst = false;
      state.isLoadingMore = false;
    })
  },
})

export default loadPokemonSlice.reducer;