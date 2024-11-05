
import Link from 'next/link';
import direccion from 'public/images/location-dot.svg';
import telefono from 'public/images/phone.svg';
import email from 'public/images/envelope.svg';

import instagramIcon from 'public/images/instagram.svg';
import facebookIcon from 'public/images/facebook.svg';
import linkedInIcon from 'public/images/linkedin.svg';
import youtubeIcon from 'public/images/youtube.svg';


const Footer = () => {
  return (
    <footer className={` relative w-full bg-[#152534] text-center`}>
      <div className={` absolute top-0 left-0 w-full h-full bg-repeat `} style={{ backgroundImage: `url(images/noise.png)` }} />
      <div className={`  absolute top-0 left-0 w-full h-3/4 bg-gradient-to-b from-[rgba(217,239,252,0.3)] to-transparent `} />
      <div className={`  absolute top-0 left-0 w-full h-5    bg-gradient-to-b from-[rgba(0,0,0,0.35)] to-transparent `} />
      <section className={` relative max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-10 md:gap-6 py-10 md:py-0`}>
        <div className={` w-full md:w-1/2 flex flex-col items-center justify-center `}>
          <p className={` `}>
            <Link className={` inline-block relative h-10 w-10 md:h-12 md:w-12 rounded-full bg-white bg-opacity-60 m-4 `} href=''><img className={`m-auto inset-0 w-5 md:w-6 h-auto object-bottom absolute opacity-60 `} src={instagramIcon.src} alt='' /></Link>
            <Link className={` inline-block relative h-10 w-10 md:h-12 md:w-12 rounded-full bg-white bg-opacity-60 m-4 `} href=''><img className={`m-auto inset-0 w-4 md:w-5 h-auto object-bottom absolute opacity-60 `} src={facebookIcon.src} alt='' /></Link>
            <Link className={` inline-block relative h-10 w-10 md:h-12 md:w-12 rounded-full bg-white bg-opacity-60 m-4 `} href=''><img className={`m-auto inset-0 w-5 md:w-6 h-auto object-bottom absolute opacity-60 `} src={linkedInIcon.src} alt='' /></Link>
            <Link className={` inline-block relative h-10 w-10 md:h-12 md:w-12 rounded-full bg-white bg-opacity-60 m-4 `} href=''><img className={`m-auto inset-0 w-6 md:w-8 h-auto object-bottom absolute opacity-60 `} src={youtubeIcon.src} alt='' /></Link>
          </p>
          <p className={` text-white text-opacity-60 text-2xl font-LexendDeca font-extralight mt-4`}>
            © 2024 LATASOFT Chile
          </p>
        </div>
        <div className={` w-full md:w-1/2 my-0 md:my-8 font-Roboto font-normal text-left text-sm sm:text-md md:text-lg text-white text-opacity-60 `}>
          <address className={` my-4 md:px-0 px-8 `}>
            <p className={` float-left ml-3 mt-1 md:mt-2 `}><img className={` w-8 h-auto opacity-60 `} src={direccion.src} alt='' /></p>
            <p className={` not-italic ml-16 `}>12 Nte 785 Of 406, Viña Del Mar.</p>
            <p className={` not-italic ml-16 `}>Los Crisantemos 146, Sto Domingo, Valparaiso.</p>
          </address>
          <address className={` my-4 md:px-0 px-8 `}>
            <p className={` float-left ml-3 mt-3 `}><img className={` w-8 h-auto opacity-60`} src={telefono.src} alt='' /></p>
            <p className={` not-italic ml-16 `}><Link className={` no-underline `} href='tel:+56942978432'>+56 9 4297 8432</Link></p>
            <p className={` not-italic  ml-16`}><Link className={` no-underline `} href='tel:+56991275137'>+56 9 9127 5137</Link></p>
          </address>
          <address className={` my-4 md:px-0 px-8 `}>
            <p className={` float-left ml-3 mt-0 `}><img className={` w-8 h-auto opacity-60 `} src={email.src} alt='' /></p>
            <p className={` not-italic ml-16 `}><Link className={` no-underline `} href='mailto:latasoftchile@gmail.com'>latasoftchile@gmail.com</Link></p>
          </address>
          <p className={` my-4 ml-16 md:px-0 px-8 `}>Lunes a Viernes<br/>de 9:00 AM a 18:00 PM</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
