import React from 'react';
import { Calc } from '../Calc';
import { Constructor } from '../Constructor';
import { Footer } from '../Footer';
import { Mode } from '../Mode';

export const App = () => {
  return (
    <div className="app">
      <h1 className="visually-hidden">Calculator constructor</h1>
      <main className="app__main">
        <Mode />
        <div className="app__content">
          <Constructor />
          <Calc />
        </div>
      </main>
      <Footer />
    </div>
  );
};
