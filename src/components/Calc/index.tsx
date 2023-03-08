import { useDrop, DropTargetMonitor } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch } from '../../store/store';
import { pushBar } from '../../store/mainSlice';
import { IState } from '../../types';

import { Bar, BarProps } from '../Bar';

export const Calc = () => {
  const { calc, runtime } = useSelector((state: IState) => state.main);
  const dispatch: AppDispatch = useDispatch();

  const bars = calc.map((barName, i) => (
    <li key={i + barName} className="calc__li">
      <Bar name={barName} order={i}></Bar>
    </li>
  ));
  // Drop bar
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'bar',
    drop: async (drag: BarProps, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      dispatch(pushBar(drag.name));
      // dispatch(toggleBar(drag.name));
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  }));

  return (
    <section
      ref={drop}
      className={
        'calc ' +
        (runtime ? 'calc_runtime ' : '') +
        (calc.length === 0 ? 'calc_empty ' : '') +
        (isOver && calc.length === 0 ? 'calc_hover' : '')
      }
    >
      {calc.length === 0 ? (
        <>
          <p className="text_accent">Перетащите сюда</p>
          <p className="text">любой элемент из левой панели</p>
        </>
      ) : (
        <ul>
          {bars}
          {isOver && calc.length > 0 && <span className="position-preview"></span>}
        </ul>
      )}
    </section>
  );
};
