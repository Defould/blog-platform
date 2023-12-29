import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { useHttp } from '../hooks/http.hook';

const initialState = {
  email: null,
  token: null,
  username: null,
  image: null,
  isLoading: false,
  error: null,
};

const _apiBase = 'https://blog.kata.academy/api/';
const _apiSignUp = 'users';
const _apiSignIn = `${_apiSignUp}/login`;
const _apiGetCurrent = 'user';

export const signUpUser = createAsyncThunk('users/signUpUser', (formData) => {
  const { request } = useHttp();
  return request(`${_apiBase}${_apiSignUp}`, 'POST', JSON.stringify(formData));
});

export const signInUser = createAsyncThunk('users/signInUser', (formData) => {
  const { request } = useHttp();
  return request(`${_apiBase}${_apiSignIn}`, 'POST', JSON.stringify(formData));
});

export const getCurrentUser = createAsyncThunk('users/getCurrentUser', (token) => {
  const { request } = useHttp();
  return request(`${_apiBase}${_apiGetCurrent}`, 'GET', null, {
    Authorization: `Token ${token}`,
  });
});

export const editUser = createAsyncThunk('users/editUser', (formData) => {
  const token = JSON.parse(localStorage.getItem('Authorization'));
  const { request } = useHttp();

  return request(`${_apiBase}${_apiGetCurrent}`, 'PUT', JSON.stringify(formData), {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  });
});

export const logOut = createAsyncThunk('user/logOut', async () => {
  localStorage.removeItem('Authorization');
  return initialState;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    editProfile: (state, action) => {
      state.currPage = action.payload;
    },
    setErrorObject: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.user.email;
        state.token = action.payload.user.token;
        state.username = action.payload.user.username;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.user.email;
        state.token = action.payload.user.token;
        state.username = action.payload.user.username;
        state.image = action.payload.user.image;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.user.email;
        state.token = action.payload.user.token;
        state.username = action.payload.user.username;
        state.image = action.payload.user.image;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.user.email;
        state.token = action.payload.user.token;
        state.username = action.payload.user.username;
        state.image = action.payload.user.image;
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.image = action.payload.image;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { editProfile, setErrorObject } = usersSlice.actions;

export default usersSlice;
