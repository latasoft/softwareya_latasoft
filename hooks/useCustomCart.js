import { useState, useEffect } from 'react';

const useCustomCart = () => {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCartData = localStorage.getItem('cartItems');
      if (savedCartData) {
        const parsedCartData = JSON.parse(savedCartData);
        const currentTime = Date.now();
        const timeLimit = 60 * 60 * 1000;
        
        if (currentTime - parsedCartData.timestamp < timeLimit) {
          setItems(parsedCartData.items);
        } else {
          // Cart data is too old; clear it
          localStorage.removeItem('cartItems');
        }
      }
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      const cartData = {
        items,
        timestamp: Date.now(), // Store the current time
      };
      localStorage.setItem('cartItems', JSON.stringify(cartData));
    }
  }, [items, hydrated]);

  const addItem = (item, type = 'purchase') => {
    setItems((prevItems) => {
      const itemExists = prevItems.find((i) => i.id === item.id);
      if (itemExists) {
        return prevItems.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: type === 'purchase' ? i.quantity + 1 : i.quantity,
                subscriptionQuantity:
                  type === 'subscription'
                    ? (i.subscriptionQuantity || 0) + 1
                    : i.subscriptionQuantity || 0,
              }
            : i
        );
      }
      return [
        ...prevItems,
        {
          ...item,
          quantity: type === 'purchase' ? 1 : 0,
          subscriptionQuantity: type === 'subscription' ? 1 : 0,
        },
      ];
    });
  };

  const removeItem = (id, type = 'purchase') => {
    setItems((prevItems) =>
      prevItems
        .map((i) => {
          if (i.id === id) {
            if (type === 'purchase' && i.quantity > 0) {
              return { ...i, quantity: i.quantity - 1 };
            } else if (
              type === 'subscription' &&
              (i.subscriptionQuantity || 0) > 0
            ) {
              return {
                ...i,
                subscriptionQuantity: i.subscriptionQuantity - 1,
              };
            }
          }
          return i;
        })
        .filter((i) => i.quantity > 0 || (i.subscriptionQuantity || 0) > 0) // Filter out items with both quantities at zero
    );
  };

  // Add clearCart function
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cartItems'); // Remove cart data from localStorage
  };
  

  return {
    items,
    addItem,
    removeItem,
    clearCart, // Expose clearCart function
    isEmpty: items.length === 0,
    totalUniqueItems: items.length,
    cartTotal: items.reduce((total, item) => {
      const purchaseTotal = item.softPrec ? item.softPrec * item.quantity : 0;
      const subscriptionTotal = item.softMensSub ? item.softMensSub * (item.subscriptionQuantity || 0) : 0;
      return total + purchaseTotal + subscriptionTotal;
    }, 0),
    hydrated,
  };
};

export default useCustomCart;
