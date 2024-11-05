
import { useCartContext } from '../app/context/CartContext';
import softwLista from 'data/softwLista.json';
import ProductoFicha from './ProductoFicha';

const ProductosFichasLista = ({ categoryIds = [] }) => {

  const { addItem, removeItem, items, hydrated } = useCartContext();

  if (!hydrated) return null;

  let filteredProducts;
  if (categoryIds.length > 0) filteredProducts = softwLista.filter(softw => categoryIds.some(categoryId => softw.softCategs.includes(categoryId)));
  else filteredProducts = softwLista;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {filteredProducts.map((softw, keyindex) => {

        const cartItem = items.find(item => item.id === softw.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        const subsQuantity = cartItem ? cartItem.subscriptionQuantity : 0;
        return  <ProductoFicha softw={softw} quantity={quantity} subsQuantity={subsQuantity} key={keyindex} />;

      })}
    </ul>
  );
};

export default ProductosFichasLista;
