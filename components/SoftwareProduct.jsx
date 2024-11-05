'use client';

import { useSearchParams } from 'next/navigation';
import SoftwareDespliegue from '/components/SoftwareDespliegue';
import softwLista from '/data/softwLista.json';

const SoftwareProduct = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  const numericProductId = Number.isInteger(Number(productId)) ? parseInt(productId, 10) : null;
  const softWareId = softwLista.find(soft => soft.id === numericProductId);

  if (!numericProductId || !softWareId) {
    return (
      <div className={`relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-white bg-opacity-40`}>
        <h2 className={`mx-auto my-8 max-w-7xl text-center text-xl sm:text-2xl md:text-3xl uppercase text-[#261b5b] text-opacity-100 font-Oswald`}>
          <span className={`font-light`}>El producto buscado no existe</span>
        </h2>
      </div>
    );
  }

  return (
    <div className={` relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl rounded-l-xl rounded-r-[2.5rem] bg-gradient-to-b from-[rgba(217,239,252,0.7)] to-[rgba(217,239,252,0.3)] shadow-md shadow-[rgba(0,0,0,0.5)]  `}>
      <SoftwareDespliegue productId={numericProductId} />
    </div>
  );
};

export default SoftwareProduct;
