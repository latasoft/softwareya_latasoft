'use client';

import { useSearchParams } from 'next/navigation';
import ProductosFichasLista from 'components/ProductosFichasLista';
import categNombrs from 'data/categNombrs.json';

const SoftwareCategory = () => {

  const searchParams = useSearchParams();
  const catgoriaId = searchParams.get('catgoriaId');

  const numericCatgoriaId = Number.isInteger(Number(catgoriaId)) ? parseInt(catgoriaId, 10) : null;
  const category = categNombrs.find(categ => categ.id === numericCatgoriaId);
  const categoryName = category ? category.catgNombr : 'Categoría desconocida';

  if (!numericCatgoriaId || !category) {
    return (
      <div className={`relative mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-gradient-to-b from-[rgba(255,255,255,0.6)] to-transparent border-t-4 border-solid border-white `}>
        <h2 className={`mx-auto my-8 max-w-7xl text-center text-xl sm:text-2xl md:text-3xl uppercase text-opacity-100 font-Oswald`}>
          <span className={`font-normal text-[#261b5b]`}>La categoría buscada no existe</span>
        </h2>
      </div>
    );
  }

  return (
    <div className={`  relative mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-gradient-to-b from-[rgba(255,255,255,0.6)] to-transparent border-t-4 border-solid border-white`}>
      <h2 className={`  mx-auto mb-8 max-w-7xl text-left   text-xl sm:text-2xl md:text-3xl uppercase text-opacity-100 font-Oswald`}>
        <span className={`font-normal text-[#261b5b]`}>Softwares en categoría</span> <span className={`font-medium text-[#2184b6] `}>{categoryName}</span>
      </h2>
      <ProductosFichasLista categoryIds={[numericCatgoriaId]} />
    </div>
  );

};

export default SoftwareCategory;
