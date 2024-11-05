
import { CART_URL } from '/lib/urls';
import shoppingCartIcon from 'public/images/cart-shopping.svg'
import Link from 'next/link';
import { useCartContext } from '../app/context/CartContext';


const CarroPestagna = () => {
    const { cartTotal, isEmpty } = useCartContext();
    return (

        <section className={` relative text-right max-w-5xl mx-auto pt-3 sm:pt-4 md:pt-5 lg:pt-6 `}>
          <Link href={CART_URL} className={` relative mx-auto inline-block text-right mr-10 ml:mr-0 transition-all ease-in-out duration-200`}>
            <span className={` align-middle border-0 m-0 overflow-hidden relative inline-block rounded-t-xl pt-2 pb-3 px-6 bg-opacity-70 hover:bg-opacity-80 shadow-inner shadow-[rgba(0,0,0,0.3)] uppercase font-medium font-Oswald text-black ${isEmpty ? `text-opacity-30 bg-[#D9EFFC]` : `text-opacity-80 bg-[#faae3b] hover:bg-[#fa813b] `} text-lg lg:text-xl transition-all ease-in-out duration-300 `} >
              <img className={`object-center object-contain w-6 lg:w-7 h-auto inline ${isEmpty ? `opacity-30` : `opacity-60`} mr-3`} src={shoppingCartIcon.src} width="28" height="auto" alt="" />
              {isEmpty ? `Carro vacío` : `Total: $ ${new Intl.NumberFormat('es-CL').format(cartTotal)}`}
            </span>
          </Link>
        </section>

    )
}

export default CarroPestagna;