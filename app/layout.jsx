
import 'styles/globals.css';
import { CartProvider } from './context/CartContext';
import Footer from 'components/footer';


export const metadata = {
  title: {
    template: '%s | SoftwareYa',
    default: 'SoftwareYa'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={` scroll-smooth `}>
      <head>

        <meta name="description" content="Venta y suscripción de software. E-commerce." />
        <meta name="keywords" content="software, e-commerce, suscripción" />
        <link rel="favicon" type="image/x-icon" href="favicon.ico" />

        <meta property="og:title" content="Softwareya" />
        <meta property="og:description" content="Venta y suscripción de software. E-commerce." />
        <meta property="og:image" content="/images/softwareya-logo-card.png" />
        <meta property="og:url" content="https://softwareya.cl" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Softwareya" />
        <meta property="og:locale" content="es_ES" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Softwareya" />
        <meta name="twitter:description" content="Venta y suscripción de software. E-commerce." />
        <meta name="twitter:image" content="/images/softwareya-logo-card.png" />

        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/favicon-512x512.png" />

      </head>
      <body className={` relative bg-[#FCF5E9] min-w-full min-h-screen flex flex-col `}>
        <div className={` absolute top-0 left-0 w-full h-full bg-repeat `} style={{ backgroundImage: `url(images/noise.png)` }} />
        <CartProvider>
          {children}
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
