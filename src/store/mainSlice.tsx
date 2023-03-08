import { createSlice } from '@reduxjs/toolkit';
import { IMainState } from '../types';

export const INITIAL_STORE = {};
const initialState: IMainState = {
  calc: [],
  runtime: false,
  values: {
    prev: null,
    current: null,
    op: '',
    prevType: '',
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
    setRuntime: (state, { payload }) => {
      state.runtime = payload;
    },
    enterNum: ({ values }, { payload }) => {
      const { current, prevType } = values;
      let start = current !== null && current !== Infinity ? current : '';
      if (prevType === 'operator') {
        start = '';
      }
      values.prevType = 'num';
      values.current = start + payload;
    },
    enterOperator: ({ values }, { payload }) => {
      const { current, prev, op, prevType } = values;
      values.op = payload;
      values.prev = values.current;
      if (prevType === 'num' && prev) {
        values.prev = eval(prev + op + current);
      }
      values.prevType = 'operator';
    },
    getResult: ({ values }) => {
      const { current, prev, op } = values;
      values.current = eval(prev + op + current);
      values.prev = null;
      values.op = '';
    },
    resetValues: ({ values }) => {
      values.prev = null;
      values.op = '';
      values.current = null;
    },
  },
});
export const {
  pushBar,
  removeBar,
  moveBar,
  setRuntime,
  enterNum,
  enterOperator,
  getResult,
  resetValues,
} = mainSlice.actions;

export default mainSlice.reducer;
