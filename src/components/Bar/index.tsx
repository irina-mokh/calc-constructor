import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { AppDispatch } from '../../store/store';
import { removeBar } from '../../store/mainSlice';
import { BarNames, DataType, IState } from '../../types';

import { Btn } from '../Btn';
import { Display } from '../Display';
import { useDnDBar } from '../../hooks';

const DATA: DataType = {
  nums: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'],
  operators: ['/', 'x', '-', '+'],
};

export type BarProps = {
  name: BarNames,
  order?: number,
};

export const Bar = (bar: BarProps) => {
  const { calc, runtime } = useSelector((state: IState) => state.main);
  const dispatch: AppDispatch = useDispatch();

  const { ref, isOver, isDragging } = useDnDBar(bar);

  const { name } = bar;
  // check if this bar has order = is located in constructor section
  const inConstructor = !Object.keys(bar).includes('order');
  const calcHas = calc.includes(name);

  let children: JSX.Element | JSX.Element[] = [];
  switch (name) {
    case 'display':
      children = <Display />;
      break;
    case 'equal':
      children = <Btn type={name} value="="></Btn>;
      break;
    default:
      children = DATA[name].map((val) => <Btn key={val} value={val} type={name}></Btn>);
      break;
  }

  const barClass = classNames({
    bar: true,
    bar_dragging: isDragging,
    bar_disabled: !runtime && inConstructor && calcHas,
  });

  const handleDoubleClick = () => {
    if (!inConstructor && !runtime) dispatch(removeBar(name));
  };
  return (
    <>
      {isOver && <span className="position-preview"></span>}
      <ul
        ref={ref}
        draggable={!(runtime || (inConstructor && calcHas))}
        onDoubleClick={handleDoubleClick}
        className={barClass + ` bar_${name} `}
      >
        {children}
      </ul>
    </>
  );
};
