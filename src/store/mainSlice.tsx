import { createSlice } from '@reduxjs/toolkit';
import { IMainState } from '../types';

export const INITIAL_STORE = {};
const initialState: IMainState = {
  calc: [],
  runtime: false,
  constructor: {
    display: true,
    operators: true,
    nums: true,
    equal: true,
  },
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
  },
});
export const { pushBar } = mainSlice.actions;

export default mainSlice.reducer;
