import { createAsyncThunk, createSlice, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { useAppSelector } from "../../app/hooks";
import { Pokemon, PokemonStore } from "../../types/pokemonType";


interface pokemonListType {
  pokemonList: PokemonStore[],
  currentPokemon: string | null
}

const initialState: pokemonListType = {
  pokemonList: [],
  currentPokemon: null
}

export const fetchPokemonItem = createAsyncThunk< PokemonStore, string | number>(
  'pokemonList/fetchPokemon',
  async function (name) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`, 
        {headers: {
          'Content-Type': 'application/json'}})

    const data = response.data
    return {
      name: data.name,
      abilities: data.abilities,
      height: data.height,
      id: data.id,
      species: data.species.url,
      image: data.sprites.other.dream_world.front_default,
      stats: data.stats,
      types: data.types, 
      weight: data.weight
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
    addPokemon (state, action) {
      state.pokemonList = [...state.pokemonList, action.payload]
        .reduce((res: PokemonStore[], poke) => {
          if (!res.find(i => i.name === poke.name)) {
            res.push(poke)
          }
          return res
        }, [])
    }
  },
  extraReducers: builder =>  {
      builder
      .addCase (fetchPokemonItem.fulfilled, (state, action) => {        
        state.pokemonList = [...state.pokemonList, action.payload]
        .reduce((res: PokemonStore[], poke) => {
          if (!res.find(i => i.name === poke.name)) {
            res.push(poke)
          }
          return res
        }, [])
      })
  },
})

export const {choosePokemon, addPokemon} = pokemonSlice.actions;
export default pokemonSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}