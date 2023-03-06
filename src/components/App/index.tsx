import React from 'react';
import { Constructor } from '../Constructor';

export const App = () => {
  return (
    <main>
      <h1>Calculator constructor</h1>
      <div className="container">
        <div className="app">
          <Constructor></Constructor>
          <section className="calc"></section>
        </div>
      </div>
    </main>
  );
};
