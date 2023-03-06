import { Display } from '../Display';
import { Bar } from '../Bar';
import { Btn } from '../Btn';

export const Constructor = () => {
  return (
    <section className="constructor">
      <Display />
      <Bar type="operators" />
      <Bar type="nums" />
      <Bar>
        <Btn>=</Btn>
      </Bar>
    </section>
  );
};
