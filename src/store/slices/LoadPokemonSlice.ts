import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { loadPokemonResponse, loadPokemonState, Results } from '../../types/loadPokemonAndFilter';


const initialState: loadPokemonState = {
  isLoading: false,
  error: '',
  mainFilter: 'ascending_numbers',
  search: null,
  next: null,
  previous: null,
  count: null,
  results: []
}

export const fetchloadPokemon = createAsyncThunk<loadPokemonResponse, undefined, {rejectValue: string}>(
  'loadPokemon/fetchloadPokemon',
  async function (_, {rejectWithValue}) {
    try {
      const response = await axios.get<loadPokemonResponse>(`https://pokeapi.co/api/v2/pokemon/`, 
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

export const fetchloadPokemonMore = createAsyncThunk<loadPokemonResponse, string | null, {rejectValue: string}>(
  'loadPokemon/fetchloadPokemonMore',
  async function (url, {rejectWithValue}) {
    try {
const response = await axios.get<loadPokemonResponse>(`${url}`, 
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