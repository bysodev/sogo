"use client";
import Image from "next/image";
import Webcam from "react-webcam";

// height={640}
// width={480}

export default function Camara({ webcamRef, imagen, counter, setFoto }) {

  return (
    <div className="w-full h-auto relative overflow-hidden rounded-xl">
      <div className="w-full min-h-full">
        <Webcam
          audio={false}
          ref={webcamRef}
          
          screenshotFormat="image/jpeg"
        />
      </div>

      <div className="w-full h-full absolute overflow-hidden top-0 left-0 ">
        {imagen && <Image src={imagen} alt="" width={640} height={480} />}
      </div>
      
      <div className="w-full h-full absolute overflow-hidden top-0 left-0 ">
        <button 
          onClick={() => {
           setFoto()
          }}
          className="w-full h-full text-center"
        >
          <span className={`opacity-90 text-white ${ counter <= 0 ? 'text-4xl' : 'text-8xl' } `}>
            {counter===0 ? 'Nuevamente' : counter}
          </span>
        </button>
      </div>
      {/* <br /> */}
      {/* <button onClick={foto}>Hacer captura</button> */}
      {/* <hr /> */}
      
    </div>
  );
}
