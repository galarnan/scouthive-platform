import { configureStore } from '@reduxjs/toolkit';

import playersReducer from './components/Players/playersSlice';

export default configureStore({
  reducer: {
    players: playersReducer,
  },
});
