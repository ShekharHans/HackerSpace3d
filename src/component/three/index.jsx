import React, { useEffect, useRef } from 'react'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { angleToRadians } from '../../utils/angle'
import { useFrame } from '@react-three/fiber' //useFrame give acess to render loop( repeatedly updates and displays the 3D scene) in Three Js
import * as THREE from "three"
import gsap from "gsap";
import { Robot } from './Robot';
import { Text, useTexture } from '@react-three/drei';


const Three = () => {

    const orbitControlsRef = useRef(null);
    useFrame((state) => {
        if (!!orbitControlsRef.current) {
            const { x, y } = state.mouse;
            orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(35));
            orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
            orbitControlsRef.current.update();
        }
    })


    useEffect(() => {
        if (!!orbitControlsRef.current) {
            console.log(orbitControlsRef.current)
            orbitControlsRef.current.enableZoom = false;

        }
    }, [orbitControlsRef.current])


    const gradientTexture = new THREE.CanvasTexture(createGradientCanvas());

    function createGradientCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 1;

        const context = canvas.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 256, 0);
        gradient.addColorStop(0, '#FF0080');
        gradient.addColorStop(0.5, '#FF8C00');
        gradient.addColorStop(1, '#6a3093');

        context.fillStyle = gradient;
        context.fillRect(0, 0, 256, 1);

        return canvas;
    }



    return (
        <>
            {/* camera */}
            <PerspectiveCamera makeDefault position={[0, -1, 5]} />
            <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(60)} enableZoom={false} maxPolarAngle={angleToRadians(80)} />

            {/* robot */}
            <Robot />

            {/* floor */}
            <mesh rotation={[-(angleToRadians(90)), 0, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#292929" />
            </mesh>
            {/* Floor Text  */}
            <Text
                position={[0, 1., -1]}
                fontSize={0.75}
                anchorX="center"
                anchorY="middle"
                textAlign="center"
                maxWidth={10}
                castShadow

            >
                {/* <meshBasicMaterial attach="material" map={gradientTexture} /> */}
                How We Addresses Your Requirements?
            </Text>

            {/* Ambient Light */}
            <ambientLight args={["#ffffff", 0.25]} />

            {/* Spotlight Light */}
            <spotLight
                args={["#ffffff", 100, 50, angleToRadians(30), 1]} // Custom parameters
                position={[7, 5, 2]} // Position the spotlight from the top
                castShadow
            />

            {/* Environment */}
            <Environment background>
                <mesh>
                    <sphereGeometry args={[50, 100, 100]} />
                    <meshBasicMaterial color="#000000" side={THREE.BackSide} />
                </mesh>
            </Environment>

        </>
    )
}

export default Three
