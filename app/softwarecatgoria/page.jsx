'use client';

import { Suspense } from 'react';
import FondoCabecera from '/components/fondoCabecera';
import SoftwareCategory from '/components/SoftwareCategory';
import CarroPestagna from 'components/CarroPestagna';

const SoftwareCategoria = () => {

  return (
    <>
      <FondoCabecera portada={false} />
      <main className={`font-Roboto flex-grow`}>

        <CarroPestagna />

        <section className={` relative pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-3 sm:px-4 md:px-5 lg:px-6 `}>
          <Suspense fallback={<div>Loading...</div>}>
            <SoftwareCategory />
          </Suspense>
        </section>
  
      </main>
    </>);
};

export default SoftwareCategoria;
