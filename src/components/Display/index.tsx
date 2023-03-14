import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { AppDispatch } from '../../store/store';
import { resetValues } from '../../store/mainSlice';
import { IState } from '../../types';
import { trimValue, MED_STR, LONG_STR } from '../../utils';

export const Display = () => {
  const {
    values: { current, prev, op },
    runtime,
  } = useSelector((state: IState) => state.main);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (prev === Infinity) {
      dispatch(resetValues());
    }
  }, [prev]);

  const isLong = String(current).length > MED_STR;
  const isExtraLong = String(current).length > LONG_STR;

  const displayClass = classNames({
    display: true,
    'display_err ': current == Infinity,
    display_long: isLong,
  });

  const compileValue = () => {
    if (runtime && current) {
      if (current === Infinity || current === -Infinity) {
        return 'Не определено';
      }
      if (isExtraLong && current) {
        return trimValue(current);
      }
      return current;
    } else {
      if (Object.is(current, -0)) return '-';
      return 0;
    }
  };

  return (
    <div className={displayClass}>
      <span className="display__memory">{prev && op ? prev + op : ''}</span>
      {compileValue()}
    </div>
  );
};
