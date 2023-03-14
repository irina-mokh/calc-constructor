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
    pushBarDown: (state, { payload }) => {
      if (payload === 'display' && state.calc.length > 0) {
        console.log('display can be only at he top!');
        return;
      }
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
      if (from.name === 'display' && to.order !== 0) {
        console.log('display can be only at he top!');
        return;
      }
      if (to.name === 'display' && to.order == 0) {
        console.log('display can be only at he top!');
        return;
      }
      const calc = state.calc;
      calc.splice(to.order, 0, from.name);
      if (from.order >= 0) {
        if (from.order < to.order) {
          calc.splice(from.order, 1);
        } else {
          calc.splice(from.order + 1, 1);
        }
      }
      state.calc = [...calc];
    },
    setRuntime: (state, { payload }) => {
      state.runtime = payload;
    },
    enterNum: ({ values }, { payload }) => {
      const { current, prevType } = values;
      let start = current !== null && current !== Infinity ? current : '';
      // clean current after operator enter
      if (prevType === ValueType.OPERATOR) {
        start = '';
      }

      if (Object.is(current, -0)) {
        start = '-';
      }
      if (Object.is(current, 0) || current === null) {
        start = '';
      }
      // handle 0 enter
      if (payload == 0 && !current) {
        return;
      }
      //paste 0 before dot
      if (payload === '.') {
        if (current === 0 || current === null || prevType === ValueType.OPERATOR) start = '0';
        if (current === -0) start = '-0';
      }
      values.current = start + payload;
      values.prevType = ValueType.NUMBER;
    },
    enterOperator: ({ values }, { payload }) => {
      const { current, prev, prevType } = values;
      values.prev = values.current;
      if (prevType === ValueType.NUMBER) {
        values.op = payload;
        if (current && prev) {
          values.prev = makeOperation(+prev, payload, +current);
        }
      }

      if (payload === '-' && (!current || prevType === ValueType.OPERATOR)) {
        values.current = -0;
      }

      values.prevType = ValueType.OPERATOR;
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
  pushBarDown,
  removeBar,
  moveBar,
  setRuntime,
  enterNum,
  enterOperator,
  getResult,
  resetValues,
} = mainSlice.actions;

export default mainSlice.reducer;
