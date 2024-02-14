import { useState } from 'react';

const useScreenshot = (webcamRef: any, hiddenCanvasRef: any) => {
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

  const captureScreenshot = () => {
    if (webcamRef.current && hiddenCanvasRef.current) {
      const screenshotDataUrl = webcamRef.current.getScreenshot();
      const image = new (window.Image as any)();
      image.onload = () => {
        const canvas = hiddenCanvasRef.current;
        const context = canvas?.getContext('2d');
        if (canvas && context) {
          // Calcula las dimensiones del cuadrado
          const squareSize = Math.min(canvas.width, canvas.height) / 2;
          const x = (canvas.width - squareSize) / 2;
          const y = (canvas.height - squareSize) / 2;
          // Calcula las dimensiones para mantener la relación de aspecto original de la imagen
          const aspectRatio = image.width / image.height;
          let drawWidth = canvas.width;
          let drawHeight = canvas.height;
          if (canvas.width / canvas.height > aspectRatio) {
            drawWidth = canvas.height * aspectRatio;
          } else {
            drawHeight = canvas.width / aspectRatio;
          }
          const drawX = (canvas.width - drawWidth) / 2;
          const drawY = (canvas.height - drawHeight) / 2;
          // Dibuja la imagen completa en el canvas
          context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
          // Crea un nuevo canvas para contener la imagen del cuadrado
          const squareCanvas = document.createElement('canvas');
          squareCanvas.width = squareSize;
          squareCanvas.height = squareSize;
          const squareContext = squareCanvas.getContext('2d');
          // Obtiene los datos de la imagen del cuadrado en el canvas original
          const imageData = context.getImageData(x, y, squareSize, squareSize);
          // Dibuja los datos de la imagen en el nuevo canvas
          if (squareContext) {
            squareContext.putImageData(imageData, 0, 0);
          }
          // Obtiene una URL de datos de la imagen en el cuadrado y la establece en el estado
          const squareDataUrl = squareCanvas.toDataURL();
          setScreenshotUrl(squareDataUrl);
        }
      };
      image.src = screenshotDataUrl;
    }
  };
  return { screenshotUrl, captureScreenshot };
};
export default useScreenshot;
