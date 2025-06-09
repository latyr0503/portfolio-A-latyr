"use client"
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './baseApi';
import authReducer from './features/authSlice';

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  try {
    const result = next(action);
    return result;
  } catch (error) {
    console.error('Erreur dans le middleware:', error);
    throw error;
  }
};

const authMiddleware: Middleware = (store) => (next) => (action) => {
  if ((action as any).type === 'auth/logout') {
    localStorage.removeItem('token');
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(loggerMiddleware)
      .concat(authMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;