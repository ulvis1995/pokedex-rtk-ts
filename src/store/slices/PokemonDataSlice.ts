import { createAsyncThunk, createSlice, AnyAction, PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios';
import { PokemonResponse, pokemonListState, PokemonStore } from "../../types/pokemonType";

const initialState: pokemonListState = {
  pokemonList: [],
  currentPokemon: '',
  error: '',
  isLoading: false,
  compare: []
}

export const fetchPokemonItem = createAsyncThunk<PokemonResponse, string | number, {rejectValue: string}>(
  'pokemonList/fetchPokemon',
  async function (name, {rejectWithValue}) {
    try {
      const response = await axios.get<PokemonResponse>(
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
    addPokemonToCompare (state, action) {
      state.compare = [...state.compare, action.payload]
      .reduce((res: string[], poke) => {
        if (!res.find(i => i === poke)) {
          res.push(poke)
        }
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
  extraReducers: builder =>  {
      builder
      .addCase (fetchPokemonItem.fulfilled, (state, action: PayloadAction<PokemonResponse>) => {        
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

export const {choosePokemon, addPokemon, addPokemonToCompare, loadingState, removePokemonCompare, removeAllPokemonCompare} = pokemonSlice.actions;
export default pokemonSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}