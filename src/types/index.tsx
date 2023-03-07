export interface IBar {
  type: BarNames;
  children: string | JSX.Element;
  order: number;
}

export type IState = {
	main: IMainState
};

type BarNames = 'display' | 'operators' | 'nums' | 'equal';

export interface IMainState {
  runtime: boolean;
  constructor: {
    // eslint-disable-next-line prettier/prettier
    [key in BarNames]: boolean;
  };
  calc: Array<BarNames>;
  values: {
    prev: number,
    current: number,
    op: string,
  };
}
