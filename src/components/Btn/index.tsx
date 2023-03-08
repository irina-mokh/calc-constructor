import { useDispatch, useSelector } from 'react-redux';

import { enterNum, enterOperator, getResult } from '../../store/mainSlice';
import { AppDispatch } from '../../store/store';
import { BarNames, IState } from '../../types';

type BtnProps = {
  children: string,
  type?: BarNames,
};

export const Btn = ({ children, type }: BtnProps) => {
  const { runtime } = useSelector((state: IState) => state.main);
  const dispatch: AppDispatch = useDispatch();
  const value = children;
  const operation = value === 'x' ? '*' : value;
  const classes = () => {
    const arr = [];
    switch (value) {
      case '0':
        arr.push('btn_zero');
        break;
      case '=':
        arr.push('btn_equal');
        break;
    }
    return arr.join(' ');
  };
  const handleClick = () => {
    if (runtime) {
      switch (type) {
        case 'nums':
          dispatch(enterNum(value));
          break;
        case 'operators':
          dispatch(enterOperator(operation));
          break;
        case 'equal':
          dispatch(getResult());
          break;
      }
    }
  };

  return (
    <button className={'btn ' + classes()} onClick={handleClick}>
      {value}
    </button>
  );
};
