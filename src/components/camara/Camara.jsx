"use client";
import Webcam from "react-webcam";
import Image from "next/image";

export default function Camara({ webcamRef, imagen, setImagen }) {
  const foto = () => {
    var captura = webcamRef.current.getScreenshot();
    setImagen(captura);
  };

  return (
    <div className="App">
      <Webcam
        audio={false}
        height={640}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={480}
      />
      <br />
      <button onClick={foto}>Hacer captura</button>
      <hr />
      {imagen && <Image src={imagen} alt="" width={640} height={480} />}
    </div>
  );
}
