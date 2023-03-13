import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { enterNum, enterOperator, getResult } from '../../store/mainSlice';
import { AppDispatch } from '../../store/store';
import { BarNames, IState } from '../../types';

type BtnProps = {
  value: string,
  type?: BarNames,
};

export const Btn = ({ value, type }: BtnProps) => {
  const { runtime } = useSelector((state: IState) => state.main);
  const dispatch: AppDispatch = useDispatch();

  //change operation sign for multiply button
  const operation = value === 'x' ? '*' : value;

  const btnClass = classNames({
    btn: true,
    btn_zero: value === '0',
    btn_equal: value === '=',
  });

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
    <button className={btnClass} onClick={handleClick}>
      {value}
    </button>
  );
};
