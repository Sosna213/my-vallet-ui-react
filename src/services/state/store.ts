import {configureStore} from '@reduxjs/toolkit';
import transactionFilterReducer from './transactions-filters/transactions-filter-slice';

export const store = configureStore({
    reducer: {
        transactionsFilter: transactionFilterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;