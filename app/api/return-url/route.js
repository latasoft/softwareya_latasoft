import { WebpayPlus } from 'transbank-sdk';
import configureTransbank from '../../../lib/transbank';

configureTransbank();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token_ws = searchParams.get('token_ws');
  const name = searchParams.get('name');
  const email = searchParams.get('email');

  // const token_tbk = searchParams.get('TBK_TOKEN');
  // const token_tbk_id_sesion = searchParams.get('TBK_ID_SESION');
  // const token_tbk_orden_compra = searchParams.get('TBK_ORDEN_COMRA');

  let success = false;
  let transactionData = {};

  try {
    const transaction = new WebpayPlus.Transaction();
    const commitResponse = await transaction.commit(token_ws);

    // console.log(token_ws);
    // console.log(token_tbk);
    // console.log(token_tbk_id_sesion);
    // console.log(token_tbk_orden_compra);
    // console.log('Transaction Status:', commitResponse.status);

    success = commitResponse.status === 'AUTHORIZED';
    transactionData = {
      buyOrder: commitResponse.buy_order,
      transactionDate: commitResponse.transaction_date || new Date().toISOString(),
    };

  } catch (error) {
    // console.log(token_tbk);
    // console.log(token_tbk_id_sesion);
    // console.log(token_tbk_orden_compra);
    console.error('Error during transaction commit:', error);
  }

  // redirection local
  // const redirectUrl = new URL('/compraresultado', req.url);

  // redirection at hosting
  const redirectUrl = new URL('https://softwareya.cl/compraresultado');

  redirectUrl.searchParams.set('compraExito', success.toString());
  redirectUrl.searchParams.set('name', name);
  redirectUrl.searchParams.set('email', email);
  redirectUrl.searchParams.set('buyOrder', transactionData.buyOrder);
  redirectUrl.searchParams.set('transactionDate', transactionData.transactionDate);

  // Redirect to the success/failure page
  return new Response(null, {
    status: 302,
    headers: {
      'Location': redirectUrl.toString(),
    },
  });
}

// Error en formulario de pago
// Cuando estés en producción, si ocurre un error en el formulario de pago, y haces click en el link de "intentar nuevamente" en la pantalla de error llegará token_ws, TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMRA.
// Esto es replicable solo en producción si inicias una transacción, abres el formulario de pago, cierras el tab de tu navegador y luego lo recuperas.

// Timeout: Cuando un usuario abre el formulario de pago pero no hace nada por más de 5 minutos, es devuelto automáticamente al comercio.
// Llegará solamente TBK_ID_SESION que contiene el session_id enviado al crear la transacción, TBK_ORDEN_COMRA que representa el buy_order enviado. No llegará token.

