import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface Results {
  name: string,
  url: string
}

interface firstLoadingObject {
  count: number | null,
  next: string | null,
  previous: null | string,
  results: Results[]
}

interface firstLoading {
  firstLoading: firstLoadingObject | null,
  status: string | null,
  error: string | null,
  next: string | null,
  pokemonList: Results[]
}

const initialState: firstLoading = {
  firstLoading: null,
  status: null,
  error: null,
  next: null,
  pokemonList: []
}

export const fetchFirstLoading = createAsyncThunk(
  'firstLoading/fetchFirstLoading',
  async function () {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, 
        {headers: {
          'Content-Type': 'application/json'}})

    const data = response.data;
    const dataN = response.data.next;
    const pokemonList = response.data.results;
    return {data, dataN, pokemonList}
  }  
)

const firstLoadingSlice = createSlice ({
  name: 'firstLoading',
  initialState,
  reducers: {},
  extraReducers: builder =>  {
      builder
      .addCase(fetchFirstLoading.pending, (state) => {
        state.status = 'loading';
        state.error = null; 
      })
      .addCase (fetchFirstLoading.fulfilled, (state, action) => {
        state.status = 'resolved'; 
        state.firstLoading = action.payload.data;
        // state.next = action.payload.dataN;
        state.pokemonList = action.payload.pokemonList;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.status = 'resolved'
      })
  },
})

export default firstLoadingSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}