import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
  players: [],
  status: 'idle',
  error: null
}


export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async () => {
  const userid = window.localStorage.getItem('USER_ID');
  const response = await fetch('http://localhost:3000/home', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          userid: userid
        })
      })
  return response.json()
})

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    filter: (state, action) => {
      return ({
       ...state,
      players: action.payload
    })
    },
    reset: () => initialState ,
    addplayer: (state,action) => {
        state.players.push(action.payload)
    }
    
  },
  extraReducers(builder) {
      builder
        .addCase(fetchPlayers.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(fetchPlayers.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // Add any fetched players to the array
          state.players = action.payload
        })
        .addCase(fetchPlayers.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
      }

 
})

export const { reset,filter,addplayer} = playersSlice.actions

export const selectAllPlayers = state => state.players.players

export default playersSlice.reducer