import { Bar } from '../Bar';
import { useSelector } from 'react-redux';
import { IState } from '../../types';

export const Constructor = () => {
  const { runtime } = useSelector((state: IState) => state.main);
  return (
    <section className="constructor">
      {!runtime && (
        <>
          <Bar name="display" />
          <Bar name="operators" />
          <Bar name="nums" />
          <Bar name="equal" />
        </>
      )}
    </section>
  );
};
