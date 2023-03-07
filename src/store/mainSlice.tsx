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
      if (state.calc.includes(payload)) {
        state.calc = state.calc.filter((calcBar) => calcBar !== payload);
      }
      state.calc = [...state.calc, payload];
    },
    removeBar: (state, { payload }) => {
      state.calc = state.calc.filter((barName) => barName !== payload);
    },
    moveBar: (state, { payload }) => {
      const { from, to } = payload;
      const calc = state.calc;
      if (from.order) {
        calc.splice(from.order, 1);
      }
      calc.splice(to.order, 0, from.name);

      state.calc = [...calc];
    },
  },
});
export const { pushBar, removeBar, moveBar } = mainSlice.actions;

export default mainSlice.reducer;
