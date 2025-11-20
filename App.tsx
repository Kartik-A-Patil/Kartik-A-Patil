import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BentoGrid } from './components/BentoGrid';
import { About } from './components/About';
import { BootLoader } from './components/BootLoader';
import { PixelReveal } from './components/PixelReveal';
import { Crosshair, GitBranch, Terminal, Activity } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const Scene = lazy(() => import('./components/Scene').then(mod => ({ default: mod.Scene })));

const SceneFallback = () => (
  <div className="flex h-full w-full items-center justify-center border border-white/10 bg-black/80 text-xs text-gray-500">
    loading viewport...
  </div>
);

const Header = () => (
  <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
        <span className="font-mono text-sm tracking-widest text-white">SYSTEM.CORE</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] tracking-widest text-gray-500">
        <a href="#" className="hover:text-white transition-colors">INDEX</a>
        <a href="#" className="hover:text-white transition-colors">MODULES</a>
        <a href="#" className="hover:text-white transition-colors">LOG</a>
      </nav>

      <div className="md:hidden">
        <span className="font-mono text-[10px] text-gray-500">MENU</span>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="border-t border-white/10 bg-black py-12 mt-20 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 bg-dither"></div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-mono text-xs text-gray-500">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-white text-sm mb-4 uppercase tracking-widest">Origin Point</h3>
          <p className="mb-2">Executing visual systems and logic.</p>
          <p>origin: (0,0,0)</p>
        </div>
        <div>
          <h3 className="text-white text-sm mb-4 uppercase tracking-widest">Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/Kartik-A-Patil"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline decoration-dotted"
              >
                GITHUB
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/kartik-patil425/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline decoration-dotted"
              >
                LINKEDIN
              </a>
            </li>
            <li>
              <a
                href="https://x.com/Kartikpatil_"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline decoration-dotted"
              >
                X.COM
              </a>
            </li>
            <li>
              <a
                href="mailto:kartikpatilnp@gmail.com"
                className="hover:text-white hover:underline decoration-dotted"
              >
                EMAIL
              </a>
            </li>
          </ul>
        </div>
        <div className="text-right flex flex-col justify-end">
          <p>© 2024 SYSTEM.CORE</p>
          <p>RENDER_TIME: 0.012ms</p>
        </div>
      </div>
      <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
         <Crosshair className="w-4 h-4 text-white/30" />
         <div className="h-px bg-white/10 flex-1 mx-4"></div>
         <Activity className="w-4 h-4 text-white/30" />
      </div>
    </div>
  </footer>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <BootLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black cursor-crosshair">
          <Header />
          
          {/* Fixed Background Elements */}
          <div className="fixed inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-12 opacity-20">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
            <div className="w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
          </div>

          <main className="relative z-10 pt-32 pb-20">
            
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="mb-4 flex items-center gap-2 text-gray-500 font-mono text-xs tracking-widest">
                  <Terminal className="w-3 h-3" />
                  <span>SOURCE_ENTRY.TSX</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6">
                  KARTIK<br />
                  PATIL<span className="animate-blink inline-block w-4 h-16 bg-white ml-2 align-middle -mt-4"></span>
                </h1>
                <pre className="text-gray-400 text-lg max-w-md leading-relaxed font-mono border-l border-white/20 pl-6 mb-8 whitespace-pre-wrap break-words">
                  <code className="block">
                    <span className="text-emerald-600">// I design and build reliable web and mobile applications focused on scalability, performance, and great user experience.</span>
                    <br />
                    <span className="text-sky-400">const</span> <span className="text-gray-100">role</span> <span className="text-gray-100">=</span> <span className="text-[#b87d67]">"Software Developer — Frontend &amp; Backend"</span><span className="text-gray-100">;</span>
                  </code>
                </pre>
                
                <div className="flex gap-4 font-mono text-xs">
                  <button className="border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors uppercase tracking-widest flex items-center gap-2 group">
                    <GitBranch className="w-3 h-3 group-hover:rotate-90 transition-transform" />
                    Init Project
                  </button>
                  <button className="text-gray-400 hover:text-white px-6 py-3 hover:underline decoration-dotted uppercase tracking-widest">
                    Read_Me.md
                  </button>
                </div>
              </div>

              <div className="order-1 lg:order-2 h-[450px] w-full">
                <div className="h-full w-full relative border border-white/10 bg-black/50 overflow-hidden">
                  <div className="absolute top-2 left-2 font-mono text-[10px] text-gray-500">VIEWPORT_01</div>
                  <div className="absolute bottom-2 right-2 font-mono text-[10px] text-gray-500">TERMINAL_01</div>
                  {/* Crosshairs corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white"></div>
                  
                  <Suspense fallback={<SceneFallback />}>
                    <Scene />
                  </Suspense>
                </div>
              </div>
            </section>

            <PixelReveal delay={0}>
              <BentoGrid />
            </PixelReveal>
            
            <PixelReveal delay={0.1}>
              <About />
            </PixelReveal>

          </main>

          <Footer />
          
          {/* Overlay Scanlines/Noise */}
          <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-dither mix-blend-overlay"></div>
        </div>
      )}
    </>
  );
}