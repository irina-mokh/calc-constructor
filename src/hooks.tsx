import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';
import { useRef, MutableRefObject } from 'react';
import { AppDispatch } from './store/store';

import { useDispatch } from 'react-redux';
import { moveBar } from './store/mainSlice';
import { BarProps } from './components/Bar';

export  const useDnDBar = (bar: BarProps) => {
	const dispatch: AppDispatch = useDispatch();
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

	return {
		ref, isOver, isDragging
	};
};
