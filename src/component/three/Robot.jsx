import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function Robot(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('models/robot/model-transformed.glb');
  const { actions } = useAnimations(animations, group);

  // Inside the component
console.log('Animations:', animations);

useEffect(() => {
  if (actions && actions['Walk']) { // Use the correct animation name here
    actions['Walk'].play(); // Use the correct animation name here
  }
}, [actions]);


  return (
    <group ref={group} dispose={null} scale={0.53} position={[0,0,2]} >
      <group name="Sketchfab_Scene" >
        <primitive object={nodes._rootJoint} />
        <skinnedMesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials.Jupiter_Body} skeleton={nodes.Object_7.skeleton} scale={0.019} castShadow/>
        <skinnedMesh name="Object_8" geometry={nodes.Object_8.geometry} material={materials.Jupiter_Body} skeleton={nodes.Object_8.skeleton} scale={0.019} castShadow />
        <skinnedMesh name="Object_10" geometry={nodes.Object_10.geometry} material={materials.Jupiter_FaceAcc} skeleton={nodes.Object_10.skeleton} scale={0.019} castShadow/>
      </group>
    </group>
  );
}

useGLTF.preload('/model-transformed.glb');
