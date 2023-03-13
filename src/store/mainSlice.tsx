import { createSlice } from '@reduxjs/toolkit';
import { IMainState, ValueType } from '../types';
import { makeOperation } from '../utils';

export const INITIAL_STORE = {};
const initialState: IMainState = {
  calc: [],
  runtime: false,
  values: {
    prev: null,
    current: null,
    op: null,
    prevType: null,
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
      if (prevType === ValueType.OPERATOR) {
        start = '';
      }
      values.prevType = ValueType.NUMBER;
      values.current = start + payload;
    },
    enterOperator: ({ values }, { payload }) => {
      const { current, prev, op, prevType } = values;
      values.op = payload;
      values.prev = values.current;
      values.prevType = ValueType.OPERATOR;

      if (prevType === ValueType.NUMBER && prev && op && current) {
        values.prev = makeOperation(+prev, op, +current);
      }
    },
    getResult: ({ values }) => {
      const { current, prev, op } = values;
      if (current && prev && op) {
        values.current = makeOperation(+prev, op, +current);
      }
      values.prev = null;
      values.op = null;
    },
    resetValues: ({ values }) => {
      values.prev = null;
      values.op = null;
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
