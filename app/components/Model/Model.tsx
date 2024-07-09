import React, { useEffect, useRef } from 'react'
import useMouse from '@/app/hooks/useMouse';
import useDimension from '@/app/hooks/useDimension';
import { motion } from 'framer-motion-3d';
import { useTransform, useMotionValue, animate, progress } from 'framer-motion';
import { useThree, useFrame } from '@react-three/fiber';
import { fragment } from '@/app/shaders/fragment';
import { vertex } from '@/app/shaders/vertex';
import { useAspect, useTexture } from '@react-three/drei';
import { MenuType } from '../../types/menuType';
import { projects } from '@/app/data/data';

export default function Model({ activeMenu }: MenuType) {

    const dimension = useDimension();
    const { viewport } = useThree();

    const textures = projects.map((project) => useTexture(project.src));

    const opactity = useMotionValue(0);

    const mouse = useMouse();

    const scale = useAspect(
        textures[0].image.width,
        textures[0].image.height,
        0.250
    );

    const smoothMouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    }

    const meshRef = useRef<any>(null);

    const uniforms = useRef({
        uOffset: { value: { x: 0, y: 0 } },
        uTexture: { value: textures[0] },
        uOpacity: { value: 1 }
    });

    useEffect(() => {
        if (activeMenu != null) {
            animate(opactity, 1, { duration: 0.2, onUpdate: progress => meshRef.current.material.uniforms.uOpacity.value = progress });
            meshRef.current.material.uniforms.uOpacity.value = 1;
            meshRef.current.material.uniforms.uTexture.value = textures[activeMenu];
        } else {
            animate(opactity, 0, { duration: 0.2, onUpdate: progress => meshRef.current.material.uniforms.uOpacity.value = progress });
            meshRef.current.material.uniforms.uOpacity.value = 0;
        }
    }, [activeMenu]);

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
        <motion.mesh scale={scale} ref={meshRef} position-x={x} position-y={y}>
            <planeGeometry args={[1, 1, 6, 6]} />
            {/* <meshBasicMaterial wireframe={true} color={"red"} /> */}
            <shaderMaterial
                transparent={true}
                vertexShader={vertex}
                fragmentShader={fragment}
                uniforms={uniforms.current}
            // wireframe={true}
            />
        </motion.mesh>
    );
}