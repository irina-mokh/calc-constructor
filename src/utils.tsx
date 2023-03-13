import { OperatorType } from './types';

export const LONG_STR = 17;
export const MED_STR = 8;

export const makeOperation = (prev: number, op: OperatorType, current: number) => {
  switch (op) {
    case OperatorType.ADDITION:
      return prev + current;
    case OperatorType.SUBTRACTION:
      return prev - current;
    case OperatorType.DIVISION:
      return prev / current;
    case OperatorType.MULTIPLICATION:
      return prev * current;
  }
};

export const trimValue = (n: number) => {
  let res = String(n);
  if (n < Math.pow(10, LONG_STR)) {
    const dotI = res.indexOf('.');
    const rounder = Math.pow(10, res.length - dotI);
    res = String(Math.round(n * rounder) / rounder);
  } else {
    res = res.slice(0, LONG_STR - 1) + '...';
  }
  return res;
};
