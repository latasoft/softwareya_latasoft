'use client';
import { Suspense, useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useCartContext } from '../context/CartContext';
import FondoCabecera from '/components/fondoCabecera';
import { HOME_URL, CART_URL } from '/lib/urls';

const PagoResultado = () => {

  console.log('Setting constants ');
  const [compraExito, setCompraExito] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [buyOrder, setBuyOrder] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [emailSent, setEmailSent] = useState(false);
  // const [emailSendingCounter, setEmailSendingCounter] = useState(0);
  // const [cartDataToBackendCounter, setCartDataToBackendCounter] = useState(0);
  const { clearCart } = useCartContext();
  const effectRunOnce = useRef(false); // Track if effect has run once

  const sendCartDataToBackend = useCallback(async (name, email, buyOrder, transactionDate, items) => {
    console.log('Attempting to send cart data to backend');
    try {
      const response = await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          buyOrder,
          transactionDate,
          items, // Send the cart items to the backend
        }),
      });

      console.log(' await response.json() ');
      const result = await response.json();

      if (response.ok && result.success) {

        // Only clear the cart after email is successfully sent
        // console.log('Emails sent successfully ' + emailSendingCounter + ', clearing cart ');
        clearCart();

        // console.log('Increasing the emailSendingCounter ');
        // setEmailSendingCounter((prevCount) => prevCount + 1);

      } else { console.error('Error sending confirmation email:', result.error); }

    } catch (error) { console.error('Catch error sending confirmation email:', error); }

  }, [clearCart]);

  useEffect(() => {
    if (effectRunOnce.current) return; // Prevent multiple runs of this effect
    if (!emailSent) {
      const searchParams = new URLSearchParams(window.location.search);
      const success = searchParams.get('compraExito');
      const userName = searchParams.get('name');
      const userEmail = searchParams.get('email');
      const order = searchParams.get('buyOrder');
      const date = searchParams.get('transactionDate');

      setCompraExito(success || '');
      setName(userName || '');
      setEmail(userEmail || '');
      setBuyOrder(order || '');
      setTransactionDate(date || '');

      // Retrieve cart items from sessionStorage
      const savedCartItems = JSON.parse(sessionStorage.getItem('cartItems'));
      if (savedCartItems) {
        console.log('setting cart items');
        setCartItems(savedCartItems || []); // Set cart items directly from array
      }

      console.log('Session Storage:', sessionStorage.getItem('cartItems'));
      if (success === true) console.log('success true condition');
      else if (success === 'true') console.log('success ttrue condition');
      else console.log('No success true condition');
      if (savedCartItems) console.log('savedCartItems condition');
      else console.log('No savedCartItems condition');

      if ( !emailSent && savedCartItems.length > 0 && (success === 'true' || success === true)) {
        // console.log('sending data to backend ' + cartDataToBackendCounter);
        sendCartDataToBackend(userName, userEmail, order, date, savedCartItems)
        .then(() =>{

          console.log(' Setting emailSent to true ');
          setEmailSent(true);

          // console.log(' Increasing the emailSendingCounter ');
          // setCartDataToBackendCounter((prevCount) => prevCount + 1);

        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
      } else console.log('fail on success true and cart sending to backend try');
      effectRunOnce.current = true; // Mark effect as run
    }
  }, [sendCartDataToBackend, emailSent]);

  if (compraExito === null) {
    return <div>Loading...</div>;
  }

  return (<>
    <FondoCabecera portada={false} />
    <Suspense fallback={<div>Loading...</div>}>
      <main className="font-Roboto flex-grow">
        <section className={` relative py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-5 lg:px-6 `}>
          <div className={` relative rounded-sm mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl bg-white bg-opacity-40  `}>
            {compraExito === 'true' ? (
              <>
                <div style={{ lineHeight: 1.6 }} className={` mx-auto my-8 text-center text-xl sm:text-2xl md:text-3xl uppercase text-[#261b5b] text-opacity-100 font-Oswald `}>
                  <h2 className={` font-medium `} >Gracias, {name}. Su compra con número {buyOrder} y fecha {new Date(transactionDate).toLocaleString()}, ha sido realizada con éxito.</h2>
                  <h2 className={` font-light `} >Un mensaje ha sido enviado a la dirección de correo {email}.</h2>
                </div>
                <p className={` mx-auto mt-8 mb-3 text-center `}><Link className={` hover:tracking-wider inline-block mx-auto text-lg sm:text-lg md:text-xl text-sky-600 italic font-bold font-Roboto no-underline hover:-translate-y-1 transition-all ease-in-out `} href={HOME_URL} passHref>&#8249;&#8249; Volver al inicio</Link></p>
              </>
            ) : (
              <>
                <div style={{ lineHeight: 1.6 }} className={` mx-auto my-8 text-center text-xl sm:text-2xl md:text-3xl uppercase text-[#261b5b] text-opacity-100 font-Oswald `}>
                  <h2 className={` font-medium `} >Lo sentimos, {name}, su compra no pudo ser procesada. </h2>
                  <h2 className={` font-light `} >Revisa los datos ingresados y el medio de pago.</h2>
                </div>
                <p className={` mx-auto mt-8 mb-3 text-center `}><Link className={` hover:tracking-wider inline-block mx-auto text-lg sm:text-lg md:text-xl text-sky-600 italic font-bold font-Roboto no-underline hover:-translate-y-1 transition-all ease-in-out `} href={CART_URL} passHref>&#8249;&#8249; Volver al carro</Link></p>
              </>
            )}
          </div>
        </section>
      </main>
    </Suspense>
    </>);
};

export default PagoResultado;