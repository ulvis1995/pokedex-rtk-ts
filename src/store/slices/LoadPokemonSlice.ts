import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { PokemonStore } from "../../types/pokemonType";

export interface Results {
  name: string,
  url: string
}

export interface loadPokemon {
  isLoading?: boolean,
  error?: string,
  mainFilter?: string,
  search?: string | null | undefined,
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
  isLoading: false,
  error: '',
  mainFilter: 'ascending_numbers',
  search: null,
  next: null,
  previous: null,
  count: null,
  results: []
}

export const fetchloadPokemon = createAsyncThunk<loadPokemon, undefined, {rejectValue: string}>(
  'loadPokemon/fetchloadPokemon',
  async function (_, {rejectWithValue}) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, 
          {headers: {
            'Content-Type': 'application/json'}})
  
      const count = response.data.count;
      const next = response.data.next;
      const previous = response.data.previous;
      const results = response.data.results;
      return {count, next, previous, results}
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue('Not found')
    }
  }  
)

export const fetchloadPokemonMore = createAsyncThunk<loadMore, string | null, {rejectValue: string}>(
  'loadPokemon/fetchloadPokemonMore',
  async function (url, {rejectWithValue}) {
    try {
const response = await axios.get(`${url}`, 
        {headers: {
          'Content-Type': 'application/json'}})

      const count = response.data.count;
      const next = response.data.next;
      const previous = response.data.previous;
      const results = response.data.results;
      return {count, next, previous, results}
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue('Not found')
    }

  }  
)

const loadPokemonSlice = createSlice ({
  name: 'loadPokemon',
  initialState,
  reducers: {
    chooseMainFilter (state, action) {
      state.mainFilter = action.payload
    },
    searchPokemon (state, action) {
      state.search = action.payload ? action.payload : null
    }
  },
  extraReducers: builder =>  {
      builder
      .addCase(fetchloadPokemon.pending, (state) => {
        state.isLoading = true;
        state.error = ''; 
      })
      .addCase(fetchloadPokemonMore.pending, (state) => {
        state.isLoading = true;
        state.error = ''; 
      })
      .addCase (fetchloadPokemon.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.error = ''; 
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
        state.isLoading = false; 
        state.error = ''; 
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
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false
      })
  },
})

export const {chooseMainFilter, searchPokemon} = loadPokemonSlice.actions;
export default loadPokemonSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}