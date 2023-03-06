type BtnProps = {
  children: string,
};

export const Btn = ({ children }: BtnProps) => {
  const classes = () => {
    const arr = [];
    switch (children) {
      case '0':
        arr.push('btn_zero');
        break;
      case '=':
        arr.push('btn_equal');
        break;
    }
    return arr.join(' ');
  };
  return <button className={'btn ' + classes()}>{children}</button>;
};
