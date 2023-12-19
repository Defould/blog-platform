import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { useHttp } from '../hooks/http.hook';

const initialState = {
  articles: [],
  articlesCount: 0,
  isLoading: false,
  error: null,
  currPage: 1,
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles', (offset = 0) => {
  const { request } = useHttp();
  return request(`https://blog.kata.academy/api/articles/?limit=5&offset=${offset}`);
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.currPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { changePage } = articlesSlice.actions;

export default articlesSlice;
