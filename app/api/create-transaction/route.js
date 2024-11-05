import { WebpayPlus } from 'transbank-sdk';
import configureTransbank from '../../../lib/transbank';

configureTransbank();

export async function POST(req) {
  try {
    const { amount, sessionId, buyOrder, returnUrl, items } = await req.json();
    const transaction = new WebpayPlus.Transaction();
    const createResponse = await transaction.create(buyOrder, sessionId, amount, returnUrl);

    const transactionDate = new Date().toISOString(); // Capture the current date and time

    return new Response(JSON.stringify({
      ...createResponse,
      buyOrder,  // Order number
      transactionDate, // Transaction date
      items, // Include the items in the response so they can be passed later
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
