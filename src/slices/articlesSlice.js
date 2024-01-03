import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { useHttp } from '../hooks/http.hook';

const initialState = {
  articlesData: [],
  article: null,
  articlesCount: 0,
  isLoading: false,
  error: null,
  currPage: 1,
  status: 'idle',
};

const _apiBase = 'https://blog.kata.academy/api/';
const _apiArticles = 'articles/';
const _limit = 5;

const { request } = useHttp();

export const fetchArticles = createAsyncThunk('articles/fetchArticles', (offset = 0) => {
  return request(`${_apiBase}${_apiArticles}?limit=${_limit}&offset=${offset}`);
});

export const fetchArticle = createAsyncThunk('articles/fetchArticle', (slug) => {
  return request(`${_apiBase}${_apiArticles}${slug}`);
});

export const createArticle = createAsyncThunk('articles/createArticle', (formData, { getState }) => {
  const { token } = getState().users;

  return request(`${_apiBase}${_apiArticles}`, 'POST', JSON.stringify(formData), {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  });
});

const _transformArticleData = (article) => {
  if (article.title) {
    article.title = article.title.toString().length > 40 ? `${article.title.substring(0, 50)}...` : article.title;
  } else {
    article.title = 'No title';
  }

  if (article.description) {
    article.description =
      article.description.toString().length > 300 ? `${article.description.substring(0, 300)}...` : article.description;
  } else {
    article.description = 'No description';
  }

  if (article.tagList.length > 0) {
    article.tagList = article.tagList
      .filter((tag) => tag !== false && tag !== null && tag !== undefined)
      .map((tag) => String(tag).slice(0, 22))
      .filter((tag) => tag.trim() !== '');
    article.tagList = article.tagList.slice(0, 10);
  }

  article.author.username =
    article.author.username.toString().length > 20
      ? `${article.author.username.slice(0, 20)}...`
      : article.author.username;

  let img = new Image();
  img.src = article.author.image;
  if (img.complete) {
    article.author.image = img.src;
  } else {
    article.author.image =
      'https://cdn3.iconfinder.com/data/icons/smoothfill-action/30/action_088-no_camera-capture-picture-image-photo-512.png';
  }

  return article;
};

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
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articlesData = action.payload.articles.map(_transformArticleData);
        state.articlesCount = action.payload.articlesCount;
        state.error = null;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.article = _transformArticleData(action.payload.article);
        state.error = null;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createArticle.pending, (state) => {
        state.status = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { changePage } = articlesSlice.actions;

export default articlesSlice;
