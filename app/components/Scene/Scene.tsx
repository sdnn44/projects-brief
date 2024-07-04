import React from 'react'
import { Canvas } from '@react-three/fiber';
import Model from '../Model/Model';

type Props = {}

export default function Scene({ }: Props) {
    return (
        <div className='relative h-screen'>
            <Canvas>
                <Model />
            </Canvas>
        </div>
    )
}