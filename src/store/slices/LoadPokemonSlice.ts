import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { PokemonStore } from "../../types/pokemonType";

export interface Results {
  name: string,
  url: string
}

interface loadPokemon {
  status?: string | null,
  error?: string | null,
  next: string | null,
  previous: string | null,
  count: number | null,
  results: Results[]
}

interface loadMore {
  count: number,
  next: string,
  previous: string,
  results: Results []
}

const initialState: loadPokemon = {
  status: null,
  error: null,
  next: null,
  previous: null,
  count: null,
  results: []
}

export const fetchloadPokemon = createAsyncThunk(
  'loadPokemon/fetchloadPokemon',
  async function () {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, 
        {headers: {
          'Content-Type': 'application/json'}})

    const count = response.data.count;
    const next = response.data.next;
    const previous = response.data.previous;
    const results = response.data.results;
    return {count, next, previous, results}
  }  
)

export const fetchloadPokemonMore = createAsyncThunk<loadMore, string | null>(
  'loadPokemon/fetchloadPokemonMore',
  async function (url) {
    const response = await axios.get(`${url}`, 
        {headers: {
          'Content-Type': 'application/json'}})

    const count = response.data.count;
    const next = response.data.next;
    const previous = response.data.previous;
    const results = response.data.results;
    return {count, next, previous, results}
  }  
)

const loadPokemonSlice = createSlice ({
  name: 'loadPokemon',
  initialState,
  reducers: {},
  extraReducers: builder =>  {
      builder
      .addCase(fetchloadPokemon.pending, (state) => {
        state.status = 'loading';
        state.error = null; 
      })
      .addCase(fetchloadPokemonMore.pending, (state) => {
        state.status = 'loading';
        state.error = null; 
      })
      .addCase (fetchloadPokemon.fulfilled, (state, action) => {
        state.status = 'resolved'; 
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.results = [...state.results, ...action.payload.results]
          .reduce((res: Results[], poke) => {
            if (!res.find(i => i.name === poke.name)) {
              res.push(poke)
            }
            return res
          }, [])
      })
      .addCase (fetchloadPokemonMore.fulfilled, (state, action) => {
        state.status = 'resolved'; 
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        // state.results.push(...action.payload.results);        
        state.results = [...state.results, ...action.payload.results]
          .reduce((res: Results[], poke) => {
            if (!res.find(i => i.name === poke.name)) {
              res.push(poke)
            }
            return res
          }, [])
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.status = 'resolved'
      })
  },
})

export default loadPokemonSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}