import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { MeshStandardMaterial } from "three"; // Vector3
import { GLTF } from "three-stdlib";
// import { useThree } from "@react-three/fiber";
import { Group } from "three"; // Importa los tipos de Three.js

type GLTFResult = GLTF & {
  nodes: {
    Hand: THREE.SkinnedMesh;
    Shirt: THREE.SkinnedMesh;
    Vest: THREE.SkinnedMesh;
    Bone: THREE.Bone;
  };
  materials: {};
};


export default function Model(props: any) {
  const ref = useRef<Group>();
  const { nodes } = useGLTF("model/hand.glb") as GLTFResult;

  // const { camera, mouse } = useThree();
  // const vec = new Vector3(1, 1, 1);

  const { color } = props;
  const allMaterials = {
    hand: new MeshStandardMaterial({ color }),
    shirt: new MeshStandardMaterial({ color: 0xc7d2eb }),
    vest: new MeshStandardMaterial({ color: 0x274479 }),
  };

  // useFrame(() => {
  //   const primaryBone = ref.current?.getObjectByName('Bone002') as Object3D | undefined;
  //   if (primaryBone) {
  //     primaryBone.updateMatrixWorld();
  //     primaryBone.position.lerp(vec.set(mouse.x, mouse.y, 1), 1);
  //     primaryBone.lookAt(0, 0, 0);
  //     primaryBone.updateMatrix();
  //   }
  // });

  return (
    <group position={[0, -1, 0]} dispose={null} ref={ref} {...props}>
      <group name="Armature">
        <skinnedMesh
          name="Hand"
          geometry={nodes.Hand.geometry}
          material={allMaterials["hand"]}
          skeleton={nodes.Hand.skeleton}
        />
        <skinnedMesh
          name="Shirt"
          geometry={nodes.Shirt.geometry}
          material={allMaterials["shirt"]}
          skeleton={nodes.Shirt.skeleton}
        />
        <skinnedMesh
          name="Vest"
          geometry={nodes.Vest.geometry}
          material={allMaterials["vest"]}
          skeleton={nodes.Vest.skeleton}
        />
        <primitive object={nodes.Bone} />
      </group>
    </group>
  );
}

useGLTF.preload("/hand.glb");
