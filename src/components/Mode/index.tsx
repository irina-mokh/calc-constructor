import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRuntime } from '../../store/mainSlice';
import { AppDispatch } from '../../store/store';
import { IState } from '../../types';

export const Mode = () => {
  const { runtime } = useSelector((state: IState) => state.main);
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRuntime(e.target.value === 'on'));
  };
  return (
    <form className="mode">
      <input
        type="radio"
        name="runtime"
        id="on"
        value="on"
        className="mode__radio"
        checked={runtime}
        onChange={handleChange}
      />
      <label htmlFor="on" className="mode__label mode__label_runtime">
        Runtime
      </label>
      <input
        type="radio"
        name="runtime"
        value="off"
        className="mode__radio"
        id="off"
        checked={!runtime}
        onChange={handleChange}
      />
      <label htmlFor="off" className="mode__label  mode__label_constructor">
        Constructor
      </label>
    </form>
  );
};
