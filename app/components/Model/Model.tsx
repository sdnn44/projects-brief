import React, { useEffect, useRef } from 'react'
import useMouse from '@/app/hooks/useMouse';
import useDimension from '@/app/hooks/useDimension';
import { motion } from 'framer-motion-3d';
import { useTransform, useMotionValue, animate } from 'framer-motion';
import { useThree, useFrame } from '@react-three/fiber';
import { fragment, vertex } from '@/app/shaders/shader';
import { useAspect, useTexture } from '@react-three/drei';
import { MenuType } from '../../types/menuType';
import { projects } from '@/app/data/data';

export default function Model({ activeMenu }: MenuType) {

    const texture = useTexture('/images/1.png');

    const dimension = useDimension();
    const { viewport } = useThree();

    const mouse = useMouse();

    const smoothMouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    }

    const meshRef = useRef<any>(null);

    const uniforms = useRef({
        uOffset: { value: { x: 0, y: 0 } },
        uTexture: { value: texture },
    })

    const interpolation = (x: number, y: any, a: number) => x * (1 - a) + y * a

    useFrame(() => {
        const { x, y } = mouse;
        const smoothX = smoothMouse.x.get();
        const smoothY = smoothMouse.y.get();
        smoothMouse.x.set(interpolation(smoothX, x.get(), 0.05));
        smoothMouse.y.set(interpolation(smoothY, y.get(), 0.05));

        meshRef.current.material.uniforms.uOffset.value = {
            x: x.get() - smoothX,
            y: -1 * (y.get() - smoothY),
        };
    });

    const x = useTransform(smoothMouse.x, [0, dimension.width], [-1 * viewport.width / 2, viewport.width / 2]);
    const y = useTransform(smoothMouse.y, [0, dimension.height], [viewport.height / 2, -1 * viewport.height / 2]);


    return (
        <motion.mesh ref={meshRef} position-x={x} position-y={y}>
            <planeGeometry args={[5, 3, 5, 5]} />
            {/* <meshBasicMaterial wireframe={true} color={"red"} /> */}
            <shaderMaterial
                vertexShader={vertex}
                fragmentShader={fragment}
                uniforms={uniforms.current}
            // transparent={true}
            // wireframe={true}
            />
        </motion.mesh>
    );
}