import IconTouch from '@/components/icons/IconTouch';
import Webcam from 'react-webcam';
/**
 * Componente de la cámara.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.webcamRef - Referencia al componente Webcam.
 * @param {string} props.imagen ?? ''  - URL de la imagen.
 * @param {number} props.counter - Contador.
 * @param {function} props.setFoto - Función para establecer la foto.
 * @param {object} props.hiddenCanvasRef - Función para establecer cuadro por matrices.
 * @returns {JSX.Element} - Elemento JSX que representa la cámara.
 */
export default function Camara({
  webcamRef,
  // imagen,
  counter,
  setFoto,
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
          onUserMedia={() => {
            handleClick();
          }}
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
        {/* {imagen && <Image src={imagen} alt="" width={640} height={480} />} */}
      </div>
      <div className=" object-cover z-10 h-full">
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 'calc(50% + 4.5rem)', // Ajusta estos valores para cambiar el tamaño del "hueco"
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(7px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            top: 'calc(50% + 4.5rem)', // Ajusta estos valores para cambiar el tamaño del "hueco"
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(7px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 'calc(50% - 4.5rem)',
            left: 0,
            bottom: 'calc(50% - 4.5rem)',
            right: 'calc(50% + 4.5rem)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(7px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 'calc(50% - 4.5rem)',
            right: 0,
            bottom: 'calc(50% - 4.5rem)',
            left: 'calc(50% + 4.5rem)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(7px)',
          }}
        />
      </div>

      <div className="w-full h-full absolute overflow-hidden top-0 left-0 z-20">
        <button
          type="button"
          title="Tomar foto"
          onClick={handleClick}
          className={` w-full h-full text-center grid content-end`}
        >
          <span
            className={`p-2 text-white fw-bold ${
              counter <= 0 ? 'text-4xl' : 'text-4xl'
            }`}
          >
            {counter === 0 ? (
              <p className="text-3xl lg:text-4xl whitespace-nowrap flex gap-4 items-center justify-center text-white">
                <IconTouch className="h-10 w-10 lg:h-12 lg:w-12" />
                <span>Tomar otra foto</span>
              </p>
            ) : (
              counter
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
