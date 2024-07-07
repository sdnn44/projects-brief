import React from 'react'
import { Canvas } from '@react-three/fiber';
import Model from '../Model/Model';

interface SceneProps {
    activeMenu: number | null;
}

export default function Scene({ activeMenu }: SceneProps) {
    return (
        <div className='fixed top-0 w-full h-screen'>
            <Canvas>
                <Model activeMenu={activeMenu} />
            </Canvas>
        </div>
    )
}