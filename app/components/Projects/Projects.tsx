import React from 'react'
import { projects } from '../../data/data';
import Link from 'next/link';

interface ProjectsProps {
    setActiveMenu: (menu: number | null) => void;
}

export default function Projects({ setActiveMenu }: ProjectsProps) {
    return (
        <div className='relative mix-blend-difference z-10 text-yellow-500 h-screen w-full'>
            <ul onMouseLeave={() => { setActiveMenu(null) }} className='border-b border-b-yellow-500'>
                {
                    projects.map((project, i) => {
                        return (
                            <Link href={project.link} rel="noopener noreferrer" target="_blank">
                                <li onMouseOver={() => { setActiveMenu(i) }} key={project.title} className='cursor-pointer text-font tracking-wider text-[4vw] p-5 border-t border-t-yellow-500 '>
                                    <p className=''>{project.title}</p>
                                </li>
                            </Link>
                        );
                    })
                }
            </ul>
        </div>
    )
}