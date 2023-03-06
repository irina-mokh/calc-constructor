import { Btn } from '../Btn';
const OPERATORS = ['/', '*', '-', '+'];
const NUMS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

type BarProps = {
  type?: string,
  children?: JSX.Element,
};
export const Bar = ({ type, children }: BarProps) => {
  let buttons;
  if (type) {
    const data = type === 'nums' ? NUMS : OPERATORS;
    buttons = data.map((val) => <Btn>{val}</Btn>);
  }
  return (
    <ul className={'bar ' + (type === 'nums' ? 'bar_nums' : '')}>{type ? buttons : children}</ul>
  );
};
