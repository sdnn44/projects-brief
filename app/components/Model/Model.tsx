import React from 'react'
import useMouse from '@/app/hooks/useMouse';
import useDimension from '@/app/hooks/useDimension';
import { motion } from 'framer-motion-3d';
import { useTransform, useMotionValue } from 'framer-motion';
import { useThree, useFrame } from '@react-three/fiber';

type Props = {}

export default function Model({ }: Props) {

    const dimension = useDimension();
    const mouse = useMouse();

    const { viewport } = useThree();

    const smoothMouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const interpolation = (x: number, y: any, a: number) => x * (1 - a) + y * a;

    useFrame(() => {
        const { x, y } = mouse;
        smoothMouse.x.set(interpolation(smoothMouse.x.get(), x.get(), 0.05));
        smoothMouse.y.set(interpolation(smoothMouse.y.get(), y.get(), 0.05));
    });

    const x = useTransform(smoothMouse.x, [0, dimension.width], [-1 * viewport.width / 2, viewport.width / 2]);
    const y = useTransform(smoothMouse.y, [0, dimension.height], [viewport.height / 2, -1 * viewport.height / 2]);

    return (
        <motion.mesh postion-x={mouse.x} postion-y={mouse.y}>
            <planeGeometry args={[5, 5, 15, 15]} />
            <meshBasicMaterial wireframe={true} color={"blue"} />
        </motion.mesh>
    );
}