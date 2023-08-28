import React, { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import "../../parallax.css"
import Overlay from "./Overlay"
import Model from "./Model"

export default function Parallax() {
    const overlay = useRef()
    const caption = useRef()
    const scroll = useRef(0)
    return (
        <>
        <div className="para">
            <Canvas id="para-model">
                <ambientLight intensity={1} />
                <Suspense fallback={null}>
                    <Model scroll={scroll} />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
            <Overlay ref={overlay} caption={caption} scroll={scroll} />
        </div>
        </>
    )
}
