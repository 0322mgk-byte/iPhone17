"use client";

import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function IPhoneModel(props: any) {
    // Load local model from public/iPhone 17 Pro.glb
    const { scene } = useGLTF("/iPhone 17 Pro.glb");
    const meshRef = useRef<THREE.Group>(null);

    // Auto-float effect
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <group ref={meshRef} {...props} dispose={null}>
            <Center>
                <primitive object={scene} scale={[40, 40, 40]} />
            </Center>
        </group>
    );
}

// Preload the model
useGLTF.preload("/iPhone 17 Pro.glb");
