import { Btn } from '../Btn';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';
import { useRef, MutableRefObject, useEffect } from 'react';
import { Display } from '../Display';
import { useSelector, useDispatch } from 'react-redux';
import { BarNames, IState } from '../../types';
import { AppDispatch } from '../../store/store';
import { removeBar } from '../../store/mainSlice';

type DataType = {
  [key: string]: Array<string>,
};
const DATA: DataType = {
  nums: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'],
  operators: ['/', 'x', '-', '+'],
};

export type BarProps = {
  name: BarNames,
  order?: number | null,
};
export const Bar = (props: BarProps) => {
  const { calc } = useSelector((state: IState) => state.main);
  const dispatch: AppDispatch = useDispatch();
  const { name, order }  = props;
  let children: JSX.Element | JSX.Element[] = [];
  switch (name) { 
    case 'display':
      children = <Display />;
      break;
    case 'equal':
      children = <Btn>=</Btn>;
      break;
    default:
      children = DATA[name].map((val) => <Btn key={val}>{val}</Btn>);
      break;
  }


  // eslint-disable-next-line prettier/prettier
  const ref = useRef() as MutableRefObject<HTMLUListElement>;

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'bar',
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [props]
  );

  // drag bar
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'bar',
      item: props,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  // task Ref
  drag(drop(ref));

  return (
    <ul
      ref={ref}
      draggable={ !!order || !calc.includes(name)}
      onDoubleClick={() => {dispatch(removeBar(name))}}
      className={
        'bar ' + `bar_${name} ` + (isOver ? 'bar_over' : '') + (isDragging ? 'bar_dragging ' : '')
      }
    >
      {children}
    </ul>
  );
};
