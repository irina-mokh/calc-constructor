import { createSlice } from '@reduxjs/toolkit';
import { IMainState } from '../types';

export const INITIAL_STORE = {};
const initialState: IMainState = {
  calc: [],
  runtime: false,
  values: {
    prev: 0,
    current: 0,
    op: '',
  },
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    pushBar: (state, { payload }) => {
      state.calc = [...state.calc, payload];
    },
    removeBar: (state, { payload }) => {
      state.calc = state.calc.filter((barName) => barName !== payload);
    },
  },
});
export const { pushBar, removeBar } = mainSlice.actions;

export default mainSlice.reducer;
