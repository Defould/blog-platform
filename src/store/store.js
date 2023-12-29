import { configureStore } from '@reduxjs/toolkit';

import articlesSlice from '../slices/articlesSlice';
import usersSlice from '../slices/userSlice';

const store = configureStore({
  reducer: {
    articles: articlesSlice.reducer,
    users: usersSlice.reducer,
  },
});

export default store;
