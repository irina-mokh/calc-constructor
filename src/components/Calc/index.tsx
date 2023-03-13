import { useDrop, DropTargetMonitor } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { AppDispatch } from '../../store/store';
import { pushBarDown } from '../../store/mainSlice';
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

  // Drop bar to calc section
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'bar',
    drop: async (drag: BarProps, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      dispatch(pushBarDown(drag.name));
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  }));

  const calcClass = classNames({
    calc: true,
    calc_runtime: runtime,
    calc_empty: calc.length === 0,
    calc_hover: isOver && calc.length === 0,
  });

  return (
    <section ref={drop} className={calcClass}>
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
