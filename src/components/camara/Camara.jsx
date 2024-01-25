import Image from 'next/image';
import Webcam from 'react-webcam';

/**
 * Componente de la cámara.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.webcamRef - Referencia al componente Webcam.
 * @param {string} props.imagen - URL de la imagen.
 * @param {number} props.counter - Contador.
 * @param {function} props.setFoto - Función para establecer la foto.
 * @returns {JSX.Element} - Elemento JSX que representa la cámara.
 */
export default function Camara({ webcamRef, imagen, counter, setFoto }) {
  /**
   * Maneja el evento de hacer clic en el botón.
   */
  const handleClick = () => {
    setFoto();
  };

  return (
    <div className="w-full h-auto relative overflow-hidden rounded-xl">
      <div className="w-full min-h-full">
        <Webcam
          className="w-[30rem] aspect-video object-cover"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      </div>
      <div className="w-full h-full absolute overflow-hidden top-0 left-0">
        {imagen && <Image src={imagen} alt="" width={640} height={480} />}
      </div>

      <div className="w-full h-full absolute overflow-hidden top-0 left-0">
        <button onClick={handleClick} className="w-full h-full text-center">
          <span
            className={`opacity-90 text-white ${
              counter <= 0 ? 'text-4xl' : 'text-8xl'
            }`}
          >
            {counter === 0 ? 'Nuevamente' : counter}
          </span>
        </button>
      </div>
    </div>
  );
}
