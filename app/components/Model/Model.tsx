import React, { useRef } from 'react'
import useMouse from '@/app/hooks/useMouse';
import useDimension from '@/app/hooks/useDimension';
import { motion } from 'framer-motion-3d';
import { useTransform, useMotionValue } from 'framer-motion';
import { useThree, useFrame } from '@react-three/fiber';
import { fragment } from '@/app/shaders/fragment';
import { vertex } from '@/app/shaders/vertex';
import { useTexture } from '@react-three/drei';

type Props = {}

export default function Model({ }: Props) {

    const dimension = useDimension();
    const mouse = useMouse();

    const { viewport } = useThree();

    const texture = useTexture("/images/1.jpg")

    const smoothMouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const uniforms = useRef({
        uTexture: { value: texture },
        uOffset: { value: { x: 0, y: 0 } }
    })

    const meshRef = useRef();

    const interpolation = (x: number, y: any, a: number) => x * (1 - a) + y * a;

    useFrame(() => {
        const { x, y } = mouse;
        const smoothX = smoothMouse.x.get();
        const smoothY = smoothMouse.y.get();
        smoothMouse.x.set(interpolation(smoothX, x.get(), 0.05));
        smoothMouse.y.set(interpolation(smoothY, y.get(), 0.05));
        // meshRef.current.material.uniforms.uOffset.value = {
        //     x: x.get() - smoothX,
        //     y: y.get() - smoothY
        // }
    });

    const x = useTransform(smoothMouse.x, [0, dimension.width], [-1 * viewport.width / 2, viewport.width / 2]);
    const y = useTransform(smoothMouse.y, [0, dimension.height], [viewport.height / 2, -1 * viewport.height / 2]);

    return (
        <motion.mesh ref={meshRef} postion-x={mouse.x} postion-y={mouse.y}>
            <planeGeometry args={[5, 5, 15, 15]} />
            {/* <meshBasicMaterial wireframe={true} color={"blue"} /> */}
            <shaderMaterial
                fragmentShader={fragment}
                vertexShader={vertex}
                uniforms={uniforms.current}
            />
        </motion.mesh>
    );
}