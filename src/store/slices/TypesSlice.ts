import { createAsyncThunk, createSlice, AnyAction, PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios';
import { Results, typeItemResponse, typeResponse, TypesState } from '../../types/loadPokemonAndFilter';

const initialState: TypesState = {
  error: '',
  isLoading: false,
  type: null,
  types: [], 
  pokemonType: []
}

export const fetchTypes = createAsyncThunk<typeResponse, undefined, {rejectValue: string}>(
  'types/fetchTypes',
  async function (_, {rejectWithValue}) {
    try {
      const response = await axios.get<typeResponse>(
        `https://pokeapi.co/api/v2/type/`, 
          {headers: {
            'Content-Type': 'application/json'}})
            
      const data = response.data
      return data
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue('Types not loaded')
    }
  }  
)

export const fetchChooseType = createAsyncThunk<typeItemResponse, string, {rejectValue: string}>(
  'types/fetchChooseType',
  async function (url, {rejectWithValue}) {
    try {
      const response = await axios.get<typeItemResponse>(`${url}`,
      {headers: {
        'Content-Type': 'application/json'}})
      const data = response.data
      return data
    } catch (error: any) {
      if (!error.response) {
        throw error;        
      }
      return rejectWithValue('Pokemons with this type not found')
    }
  }
)

const typeSlice = createSlice ({
  name: 'types',
  initialState,
  reducers: {
    chooseType(state, action) {
      state.type = action.payload ? action.payload : null
      state.pokemonType.length = 0
    }
  },
  extraReducers: builder =>  {
      builder
      .addCase (fetchTypes.fulfilled, (state, action) => {        
        state.isLoading = false;
        state.error = '';
        state.types = action.payload.results
        .filter(item => item.name !== 'unknown' && item.name !== 'shadow')
        .sort((a, b)=>a.name.localeCompare(b.name))
      })
      .addCase (fetchTypes.pending, (state) => {
        state.isLoading = true;
        state.error = ''
      })
      .addCase(fetchChooseType.fulfilled, (state, action) => {
        state.pokemonType = action.payload.pokemon.map(poke => 
          ({name: poke.pokemon.name, url: poke.pokemon.url}))
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false
      })
  },
})

export const {chooseType} = typeSlice.actions;
export default typeSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}