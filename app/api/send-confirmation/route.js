import nodemailer from 'nodemailer';

export async function POST(req) {
    console.log('send-confirmation route triggered');
    try {

        console.log('send-confirmation route triggered');
        const { name, email, buyOrder, transactionDate, items } = await req.json();

        console.log('Request data:', { name, email, buyOrder, transactionDate, items });

        if (!items || items.length === 0) {
            console.log('No items to process');
            return new Response(JSON.stringify({ success: false, message: "No items to process." }), { status: 400 });
        }

        let transporter = nodemailer.createTransport({
            host: 'mail.softwareya.cl',
            port: 587,
            secure: false, // true for port 465, false for port 587
            auth: {
                user:'sofwareyacompra@softwareya.cl',
                pass: 'JDG35TuZU52rrBNFy7Td',
            },
        });

        // Build the purchase and subscription summary
        let purchaseDetails = '';
        let totalPurchase = 0;
        let totalSubscription = 0;

        items.forEach((item) => {
            const purchaseTotal = item.softPrec ? item.softPrec * item.quantity : 0;
            const subscriptionTotal = item.softMensSub ? item.softMensSub * (item.subscriptionQuantity || 0) : 0;

            if (item.quantity > 0) {
                purchaseDetails += `${item.softNombr}\n${item.quantity} unidad${item.quantity > 1 ? 'es' : ''} por $${item.softPrec} cada una.\n\n`;
            }

            if (item.subscriptionQuantity > 0) {
                purchaseDetails += `${item.softNombr}\n${item.subscriptionQuantity} subscripción${item.subscriptionQuantity > 1 ? 'es' : ''} por $${item.softMensSub} cada una.\n\n`;
            }

            totalPurchase += purchaseTotal;
            totalSubscription += subscriptionTotal;
        });

        const totalPaid = totalPurchase + totalSubscription;
        purchaseDetails += `Total compras: $${totalPurchase}\nTotal subscripciones: $${totalSubscription}\nTotal pagado: $${totalPaid}`;

        // Send email to buyer
        let buyerMailOptions = {
            from: '"SoftwareYa" <sofwareyacompra@softwareya.cl>',
            to: email,
            subject: `Confirmación de compra en SoftwareYa - ${buyOrder}`,
            text: `Hola, ${name},\n\nGracias por tu compra. Estos son los detalles de tu orden:\n\nNúmero: ${buyOrder}\nFecha de la compra: ${transactionDate}\n\n${purchaseDetails}\n\nQue tengas un buen día.\nSoftwareYa\n\n`,
        };

        // Send email to admin
        let adminMailOptions = {
            from: '"SoftwareYa" <sofwareyacompra@softwareya.cl>',
            to: 'latasoftchile@gmail.com', // Replace with the actual admin email
            subject: `Notificación de transacción SoftwareYa - ${buyOrder}`,
            text: `Administrador,\n\nSe ha efectuado una nueva compra, realizada por ${name}, correo electrónico ${email}.\n\nNúmero: ${buyOrder}\nFecha de la transacción: ${transactionDate}\n\n${purchaseDetails}\n\n`,
        };

        // Send both emails
        console.log('Sending email to buyer:', buyerMailOptions);
        console.log('Sending email to admin:', adminMailOptions);

        let buyerEmailInfo = await transporter.sendMail(buyerMailOptions);
        console.log('Buyer email sent successfully:', buyerEmailInfo.messageId);

        let adminEmailInfo = await transporter.sendMail(adminMailOptions);
        console.log('Admin email sent successfully:', adminEmailInfo.messageId);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
