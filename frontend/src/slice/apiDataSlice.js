import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import routesApi from '../routesApi';
import axios from 'axios';


export const userData = createAsyncThunk('users/usersData', async () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const dataPath = routesApi.dataUser();
    const { data } = await axios.get(dataPath, {
      headers: {
        Authorization: `Bearer ${userId.token}`,
      },
    });
    return data;
  });

  const initialState = { loadingStatus: 'idle', error: null };
  const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },   
    extraReducers: (builder) => builder
      .addCase(userData.pending, (state) => { 
        return {
          ...state, loadingStatus: 'loading', error: null
        } 
      })
      .addCase(userData.fulfilled, (state) => {
        return {...state, loadingStatus: 'idle', error: null} 
    })
      .addCase(userData.rejected, (state, action) => ({ ...state, loadingStatus: 'failed', error: action.error })),
  });

  export default userSlice.reducer;
  