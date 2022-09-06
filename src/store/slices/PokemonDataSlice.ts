import { createAsyncThunk, createSlice, AnyAction, PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios';
import { Pokemon, PokemonStore } from "../../types/pokemonType";


export interface pokemonListType {
  pokemonList: PokemonStore[],
  currentPokemon: string | null,
  error: string ,
  isLoading: boolean,
}

const initialState: pokemonListType = {
  pokemonList: [],
  currentPokemon: null,
  error: '',
  isLoading: false,
}

export const fetchPokemonItem = createAsyncThunk<Pokemon, string | number, {rejectValue: string}>(
  'pokemonList/fetchPokemon',
  async function (name, {rejectWithValue}) {
    try {
      const response = await axios.get<Pokemon>(
        `https://pokeapi.co/api/v2/pokemon/${name}`, 
          {headers: {
            'Content-Type': 'application/json'}})
            
      const data = response.data
      return data
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
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
    addPokemon (state, action) {
      state.pokemonList = [...state.pokemonList, action.payload]
        .reduce((res: PokemonStore[], poke) => {
          if (!res.find(i => i.name === poke.name)) {
            res.push(poke)
          }
          return res
        }, [])
    }, 
    filtredPokemons (state,action) {
      state.pokemonList = action.payload
    }
  },
  extraReducers: builder =>  {
      builder
      .addCase (fetchPokemonItem.fulfilled, (state, action: PayloadAction<Pokemon>) => {        
        state.isLoading = false;
        state.error = '';
        state.pokemonList = [...state.pokemonList, {
          name: action.payload.name,
          abilities: action.payload.abilities,
          height: action.payload.height,
          id: action.payload.id,
          species: action.payload.species.url,
          image: action.payload.sprites.other.dream_world.front_default,
          image_2: action.payload.sprites.other['official-artwork'].front_default,
          stats: action.payload.stats,
          types: action.payload.types, 
          weight: action.payload.weight
        }]
        .reduce((res: PokemonStore[], poke) => {
          if (!res.find(i => i.name === poke.name)) {
            res.push(poke)
          }
          return res
        }, [])
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

export const {choosePokemon, addPokemon, filtredPokemons} = pokemonSlice.actions;
export default pokemonSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}