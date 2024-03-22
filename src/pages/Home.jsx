import React from 'react';
import Products from '../components/Products';
import Banner from '../components/Banner';

export default function Home() {
  return (
    <div>
      <section>
        <Banner />
      </section>
      <section>
        <Products />
      </section>
    </div>
  )
}
