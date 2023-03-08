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
    prev: number | null,
    current: number | null,
    op: string,
    prevType: string,
  };
}

export type DataType = {
  [key: string]: Array<string>,
};
