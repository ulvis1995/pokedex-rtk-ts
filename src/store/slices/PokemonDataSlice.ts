import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { Pokemon } from "../../types/pokemonType";


interface pokemonListType {
  pokemonList: Pokemon[],
  currentPokemon: string | null
}

const initialState: pokemonListType = {
  pokemonList: [],
  currentPokemon: null
}

export const fetchPokemonItem = createAsyncThunk<Pokemon, string>(
  'pokemonList/fetchPokemon',
  async function (name) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`, 
        {headers: {
          'Content-Type': 'application/json'}})

    const data = response.data;
    return data
  }  
)

const pokemonSlice = createSlice ({
  name: 'pokemonList',
  initialState,
  reducers: {
    choosePokemon(state, action) {
      state.currentPokemon = action.payload
    }
  },
  extraReducers: builder =>  {
      builder
      .addCase (fetchPokemonItem.fulfilled, (state, action) => {
        state.pokemonList = [...state.pokemonList, action.payload];
      })
  },
})

export const {choosePokemon} = pokemonSlice.actions;
export default pokemonSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}