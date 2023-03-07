export interface IBar {
  type: BarNames;
  children: string | JSX.Element;
  order: number;
}

export type IState = {
  main: IMainState,
};

export type BarNames = 'display' | 'operators' | 'nums' | 'equal';

export interface IMainState {
  runtime: boolean;
  calc: Array<BarNames>;
  values: {
    prev: number,
    current: number,
    op: string,
  };
}
