import Image from 'next/image';
import Webcam from 'react-webcam';

/**
 * Componente de la cámara.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.webcamRef - Referencia al componente Webcam.
 * @param {string} props.imagen - URL de la imagen.
 * @param {number} props.counter - Contador.
 * @param {function} props.setFoto - Función para establecer la foto.
 * @param {object} props.canvasRef - Función para establecer cuadro por matrices.
 * @param {object} props.hiddenCanvasRef - Función para establecer cuadro por matrices.
 * @returns {JSX.Element} - Elemento JSX que representa la cámara.
 */
export default function Camara({
  webcamRef,
  imagen,
  counter,
  setFoto,
  canvasRef,
  hiddenCanvasRef,
}) {
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
          width={500}
          height={600}
          screenshotQuality={1}
          className="aspect-[12/9] object-cover"
          audio={false}
          ref={webcamRef}
          forceScreenshotSourceSize={true}
          minScreenshotWidth={1920}
          minScreenshotHeight={1080}
          screenshotFormat="image/jpeg"
          mirrored={true}
        />
        <canvas
          className="aspect-[12/9] object-cover z-10 h-full"
          ref={canvasRef}
          width={500}
          height={600}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        <canvas
          className="aspect-[12/9] object-cover z-10 h-full"
          ref={hiddenCanvasRef}
          width={500}
          height={600}
          style={{ position: 'absolute', top: 0, left: 0, display: 'none' }}
        />
      </div>
      <div className="w-full h-full absolute overflow-hidden top-0 left-0 aspect-square">
        {imagen && <Image src={imagen} alt="" width={640} height={480} />}
      </div>

      <div className="w-full h-full absolute overflow-hidden top-0 left-0 z-20">
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
