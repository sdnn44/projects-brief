"use client";
import { useEffect, useState } from "react";
import Scene from "./components/Scene/Scene";
import Lenis from 'lenis';
import Projects from "./components/Projects/Projects";

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
      <Scene activeMenu={activeMenu} />
      <div className="h-[50vh]"></div>
      <Projects setActiveMenu={setActiveMenu} />
      <div className="h-[50vh]"></div>
      <p className="text-right p-4 text-[10px] text-yellow-500"><span className="font-bold">Source:</span> https://blog.olivierlarose.com/tutorials/mouse-image-distortion</p>
    </main>
  );
}
