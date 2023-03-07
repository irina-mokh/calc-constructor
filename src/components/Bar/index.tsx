import { Btn } from '../Btn';
const OPERATORS = ['/', 'x', '-', '+'];
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

  const classes = () => {
    const arr = [];
    switch (type) {
      case 'nums':
        arr.push('bar_nums');
        break;
      case 'operators':
        arr.push('bar_operators');
        break;
    }
    return arr.join(' ');
  };
  return <ul className={'bar ' + classes()}>{type ? buttons : children}</ul>;
};
