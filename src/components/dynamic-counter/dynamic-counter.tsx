import React, { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay != null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function DynamicCounter() {
  const [counter, setCounter] = useState(0);

  useInterval(() => {
    setCounter(counter + 1);
  }, 1000);

  return (
    <section className="section">
      <h1 className="section__title">Counter {counter}</h1>
    </section>
  );
}
