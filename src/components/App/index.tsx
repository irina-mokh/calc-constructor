import React from 'react';
import { Calc } from '../Calc';
import { Constructor } from '../Constructor';

export const App = () => {
  return (
    <main className="main">
      <h1 className="visually-hidden">Calculator constructor</h1>
      <div className="container">
        <div className="app">
          <Constructor />
          <Calc />
        </div>
      </div>
    </main>
  );
};
