import { configureStore } from '@reduxjs/toolkit';

import playersReducer from './routes/Home/playersSlice';

export default configureStore({
  reducer: {
    players: playersReducer,
  },
});
