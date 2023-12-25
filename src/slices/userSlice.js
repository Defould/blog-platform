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
const _apiUsers = 'users';

export const signUpUsers = createAsyncThunk('users/signUpUsers', (formData) => {
  const { request } = useHttp();
  return request(`${_apiBase}${_apiUsers}`, { method: 'POST', body: JSON.stringify(formData) });
});

// export const fetchArticle = createAsyncThunk('articles/fetchArticle', (slug) => {
//   const { request } = useHttp();
//   return request(`${_apiBase}${_apiUsers}${slug}`);
// });

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    editProfile: (state, action) => {
      state.currPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.image = action.payload.image;
      })
      .addCase(signUpUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    // .addCase(fetchArticle.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(fetchArticle.fulfilled, (state, action) => {
    //   state.isLoading = false;
    // })
    // .addCase(fetchArticle.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message;
    // });
  },
});

export const { editProfile } = usersSlice.actions;

export default usersSlice;
