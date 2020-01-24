import React from 'react';
import { useSelector } from 'react-redux';

export function Data() {
  const user = useSelector(state => state.user);

  return (
    <section className="section">
      <h1 className="section__title">Hello, {user}!</h1>
    </section>
  );
}
