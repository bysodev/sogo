import { useEffect, useRef } from 'react';

function WhatsAppLink({ phone = '+593980844714', children }) {
  const linkRef = useRef(null);

  useEffect(() => {
    const contactMe = `send?phone=${phone}&text=Hola SoGo Sign 🖐, recién visité su plataforma de aprendizaje. Los contacto por...`;

    function isMobileOrTablet() {
      return window.matchMedia('(max-width: 768px)').matches;
    }
    var whatsAPI = isMobileOrTablet()
      ? 'https://api.whatsapp.com/'
      : 'https://web.whatsapp.com/';
    linkRef.current.href = `${whatsAPI}${contactMe}`;
  }, [phone]);

  return (
    <a
      ref={linkRef}
      target="_blank"
      href=""
      title="Enviar mensaje por WhatsApp"
      className="btn text-white whitespace-nowrap flex gap-2 bg-green-500 hover:bg-green-600"
    >
      {children}
    </a>
  );
}

export default WhatsAppLink;
