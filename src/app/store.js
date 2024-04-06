import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '../features/transactionsSlice';

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});