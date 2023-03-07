export interface IBar {
  type: BarNames;
  children: string | JSX.Element;
  order: number;
}

export type IState = {
  main: IMainState,
};

export type BarNames = 'display' | 'operators' | 'nums' | 'equal';

// type ConstructorType = {
// 	// eslint-disable-next-line prettier/prettier
// 	[key in BarNames]: boolean;
// };
export interface IMainState {
  runtime: boolean;
  // constructor: ConstructorType;
  calc: Array<BarNames>;
  values: {
    prev: number,
    current: number,
    op: string,
  };
}
