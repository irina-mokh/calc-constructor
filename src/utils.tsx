import { OperatorType } from './types';

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
