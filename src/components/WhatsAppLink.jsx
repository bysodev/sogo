import { useEffect, useRef } from 'react';
import { showErrorToast, showSuccessToast } from "@/utilities/sweet-alert";

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

  const handleClick = () => {
    showErrorToast('Deshabilitado temporalmente hasta que integrar un número de télefono institucional');
  };
  
  // ref={linkRef}
  return (
    <a
      target="_blank"
      href=""
      title="Enviar mensaje por WhatsApp"
      className="btn text-white whitespace-nowrap flex gap-2 bg-green-500 hover:bg-green-600"
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

export default WhatsAppLink;
