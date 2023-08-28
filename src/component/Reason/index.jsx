import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Reflector, Text, useTexture, useGLTF } from '@react-three/drei'
import { angleToRadians } from '../../utils/angle'
import { Astronaut } from './Astronaut'
// import CircularSlider from './CircularSlider'

export default function Reason() {
    const loader = new THREE.CubeTextureLoader();
    const cubeMapTexture = loader.load([
        'right.png',
        'left.png',
        'top.png',
        'bottom.png',
        'front.png',
        'back.png',
    ]);
    const numTexts = 5;
    const radius = 1;
    return (
        <Canvas concurrent gl={{ alpha: false }} pixelRatio={[1, 1.5]} camera={{ position: [0, 3, 10], fov: 15 }}>
            {cubeMapTexture && (
                <primitive attach="background" object={cubeMapTexture} />
            )}
            <fog attach="fog" args={['black', 15, 20]} />

            <Suspense fallback={null}>
                <group position={[0, -1, 0]}>
                    <Astronaut position={[-1.2, 0, 0.6]} scale={[0.5, 0.5, 0.5]} />
                    {/* <IntroducingText position={[0, 2, -2]} /> */}
                    {/* <VideoText position={[0, 1.3, -2]} /> */}
                    <Ground />
                    {Array.from({ length: numTexts }).map((_, index) => {
                        const angle = (Math.PI * 2 * index) / numTexts;
                        const text = ["Inspiration", "Innovation", "Diversity", "Events", "Workshops"][index];
                        return <CircularText key={index} text={text} radius={radius} angle={angle} />;
                    })}
                </group>
                <ambientLight args={["#ffffff", 0.25]} />
                <spotLight
                    args={["#ffffff", 100, 50, angleToRadians(30), 1]} // Custom parameters
                    position={[1, 2, -3]} // Position the spotlight from the top
                />
                <pointLight color="white" intensity={1} position={[10, 10, 10]} />
                <directionalLight position={[-50, 0, -40]} intensity={0.7} />
                <directionalLight
                    color="#ffffff"
                    intensity={1}  // Adjust the intensity of the directional light
                    position={[1, 3, -2]}  // Position the light to illuminate the ground
                />
                {/* <CircularSlider position={[0, 2, -2]}/> */}


                <Intro />
            </Suspense>
        </Canvas>
    )
}



function CircularText(props) {
    const { text, radius, angle } = props;

    const position = [
        1 + Math.cos(angle) * radius,
        1.5 + Math.sin(angle) * radius,
        -1.5, // Raise the text slightly above the ground
    ];

    return (
        <Text font="/Inter-Bold.woff" fontSize={0.5} letterSpacing={0} lineHeight={1.5} position={position}>
            {text}
            <meshBasicMaterial toneMapped={false}>
                <color attach="color" args={['white']} />
            </meshBasicMaterial>
        </Text>
    );
}

function IntroducingText(props) {
    return (
        <Text font="/Inter-Bold.woff" fontSize={0.4} letterSpacing={-0.06} {...props}>
            Introducing
            <meshBasicMaterial toneMapped={false}>
                <color attach="color" args={['white']} />
            </meshBasicMaterial>
        </Text>
    );
}

function Ground() {
    const [floor, normal] = useTexture([
        '/moon_surface.jpg', // Replace with the path to your moon surface texture
        '/moon_surface_normal.jpeg',  // Replace with the path to your moon surface normal map
    ]);

    return (
        <Reflector
            blur={[400, 100]}
            resolution={512}
            args={[10, 10]}
            mirror={0.5}
            mixBlur={6}
            mixStrength={1.5}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            receiveShadow
        >
            {(Material, props) => (
                <Material
                    color="#a0a0a0"
                    metalness={0.7} // Adjust the metalness for the reflective effect
                    roughness={0.2} // Adjust the roughness for the reflective effect
                    clearcoat={1}   // Add a clearcoat for extra shine
                    clearcoatRoughness={0.1} // Adjust the clearcoat roughness
                    normalMap={normal}
                    normalScale={[2, 2]}
                    {...props}
                />
            )}
        </Reflector>

    );
}


function Intro() {
    const [vec] = useState(() => new THREE.Vector3())
    return useFrame((state) => {
        state.camera.position.lerp(vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14), 0.05)
        state.camera.lookAt(0, 0, 0)
    })
}
