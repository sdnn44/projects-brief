"use client";
import { useEffect, useState } from "react";
import Scene from "./components/Scene/Scene";
import Lenis from 'lenis';
import Projects from "./components/Projects/Projects";
import { MenuType } from "./types/menuType";

export default function Home() {

  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main>
      <div className="h-[50vh]"></div>
      <Projects setActiveMenu={setActiveMenu} />
      <Scene activeMenu={activeMenu} />
      <div className="h-[50vh]"></div>
    </main>
  );
}
