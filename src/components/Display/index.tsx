import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch } from '../../store/store';
import { resetValues } from '../../store/mainSlice';
import { IState } from '../../types';

const LONG_STR = 17;

export const Display = () => {
  const {
    values: { current, prev, op },
    runtime,
  } = useSelector((state: IState) => state.main);
  const dispatch: AppDispatch = useDispatch();

  let res = String(current);
  const isLong = res.length > 8;

  // check value length & change
  if (isLong && current && res.length > LONG_STR) {
    if (res.includes('.')) {
      const lastChar = Number(res[LONG_STR - 1]);
      const round = Number(res[LONG_STR]);
      res = res.slice(0, LONG_STR - 1) + String(round >= 5 ? lastChar + 1 : lastChar);
    } else if (res.length > LONG_STR) {
      res = res.slice(0, LONG_STR - 1) + '...';
    }
  }
  useEffect(() => {
    if (prev === Infinity) {
      dispatch(resetValues());
    }
  }, [prev]);

  return (
    <div
      className={
        'display ' + (current == Infinity ? 'display_err ' : '') + (isLong && 'display_long ')
      }
    >
      <span className="display__memory">{prev && op ? prev + op : ''}</span>
      {runtime && current ? (current === Infinity ? 'Не определено' : res) : 0}
    </div>
  );
};
