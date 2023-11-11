import { OrbitControls } from "@react-three/drei";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        intensity={1}
        castShadow={true}
        shadow-bias={-0.0002}
        shadow-mapSize={[2048, 2048]}
        position={[85.0, 80.0, 70.0]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <OrbitControls
        target={[0, 1, 0]}
        minPolarAngle={1.5}
        maxPolarAngle={1.5}
        minDistance={0.5}
        maxDistance={5}
        enableZoom={false}
      />
    </>
  );
};
