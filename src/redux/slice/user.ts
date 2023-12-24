import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';
import { fetchSelf, loginUser, registerUser } from '../../actions/user';
import { AUTH_TOKEN } from '../../constants';

type InitialStateType = {
  data: User;
  token: string;
  error?: string;
  isLoggedIn: boolean;
};

const initialState: InitialStateType = {
  data: {},
  token: '',
  error: '',
  isLoggedIn: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: state => {
      state.error = '';
    },
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem(AUTH_TOKEN, state.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem(AUTH_TOKEN, state.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoggedIn = false;
      })
      .addCase(fetchSelf.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(fetchSelf.rejected, (state, action) => {
        state.isLoggedIn = false;
        if (action.error.message === 'user_not_authenticated') {
          localStorage.removeItem(AUTH_TOKEN);
        }
      });
  }
});

export const { clearError, addToken } = userSlice.actions;

export default userSlice.reducer;
