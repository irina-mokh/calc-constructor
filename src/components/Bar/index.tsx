import { useRef, MutableRefObject } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';
import classNames from 'classnames';

import { AppDispatch } from '../../store/store';
import { moveBar, removeBar } from '../../store/mainSlice';
import { BarNames, DataType, IState } from '../../types';

import { Btn } from '../Btn';
import { Display } from '../Display';

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

  const { name }  = bar;
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

  // eslint-disable-next-line prettier/prettier
  const ref = useRef() as MutableRefObject<HTMLUListElement>;

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'bar',
      drop: async (drag: BarProps, monitor) => {
        if (monitor.didDrop()) {
          return;
        }
        dispatch(moveBar({ from: drag, to: bar}));
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [bar]
  );

  // drag bar
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'bar',
      item: bar,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  // task Ref
  drag(drop(ref));

  const barClass = classNames({
    bar: true,
    'bar_dragging': isDragging,
    'bar_disabled': !runtime && inConstructor && calcHas,
  });

  const handleDoubleClick = () => {
    if (!inConstructor && !runtime) dispatch(removeBar(name));
  };
  return (
    <>
      {isOver && <span className='position-preview'></span>}
      <ul
        ref={ref}
        draggable={ !(runtime || (inConstructor && calcHas))}
        onDoubleClick={handleDoubleClick}
        className={
          barClass + ` bar_${name} `
        }
      >
        {children}
      </ul>
    </>
  );
};
