import React from 'react'
import { MenuType } from '../../types/menuType';
import { projects } from '../../data/data';

interface ProjectsProps {
    setActiveMenu: (menu: number | null) => void;
}

export default function Projects({ setActiveMenu }: ProjectsProps) {
    return (
        <div className='relative mix-blend-difference z-10 text-black h-screen w-full'>
            <ul onMouseLeave={() => { setActiveMenu(null) }} className='border-b'>
                {
                    projects.map((project, i) => {
                        return (
                            <li onMouseOver={() => { setActiveMenu(i) }} key={project.title} className='text-[4vw] p-5 border-t'>
                                <p>{project.title}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}