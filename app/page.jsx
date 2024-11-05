'use client';

import ProductosFichasLista from '../components/ProductosFichasLista';
import FondoCabecera from '../components/fondoCabecera';
import CarroPestagna from 'components/CarroPestagna';

export default function Home() {
  return (
    <>
      <FondoCabecera portada={true} />
      <main className={` relative font-Roboto flex-grow `}>

        <CarroPestagna />

        <section className={` relative pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-3 sm:px-4 md:px-5 lg:px-6 `}>
          <div className={` relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-gradient-to-b from-[rgba(255,255,255,0.6)] to-transparent border-t-4 border-solid border-white `}>
            <h2 className={` mx-auto mb-8  max-w-7xl text-left text-xl sm:text-2xl md:text-3xl uppercase font-Oswald `} ><span className={`font-normal text-[#261b5b]`}>Encuentra el</span> <span className={`font-medium text-[#2184b6] `}>software que buscas</span></h2>
            <ProductosFichasLista />
          </div>
        </section>

      </main>
    </>
  );
}
