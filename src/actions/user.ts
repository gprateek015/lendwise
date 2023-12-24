import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';
import { User } from '../types';

export const registerUser = createAsyncThunk(
  'register-user',
  async (data: User) => {
    const response = await Axios.post('/user', data);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'login-user',
  async (data: { mobile_no: string; password: string }) => {
    const response = await Axios.post('/user/login', data);
    return response.data;
  }
);

export const fetchSelf = createAsyncThunk('fetch-self', async () => {
  const response = await Axios.get('/user/');
  return response.data;
});
