import React from 'react';
import Portrait from '../assets/img.jpg';
export const About = () => {
  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Image / Avatar */}
        <div className="relative aspect-square max-w-md w-full mx-auto md:mx-0 bg-gray-900 overflow-hidden border border-white/20 group">
            {/* Placeholder for Portrait */}
            <img 
                src={Portrait} 
                alt="Portrait" 
                className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dither Overlay */}
            <div className="absolute inset-0 bg-dither opacity-30 mix-blend-overlay pointer-events-none"></div>
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%]"></div>
            
            {/* Tech overlay text */}
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white bg-black px-2 py-1 border border-white/30">
                IMG_SRC: ID_0X99
            </div>
        </div>

        {/* Bio Text */}
        <div className="flex flex-col justify-center h-full">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-white"></div>
                <h2 className="text-2xl font-mono tracking-tight">ABOUT_ME</h2>
            </div>

            <div className="font-mono text-sm md:text-base text-gray-400 space-y-6 leading-relaxed">
                <p className="text-white">
                    <span className="text-gray-600">/**</span><br/>
                    <span className="pl-4 block">
                        I'm a software developer who builds reliable, maintainable applications for the web and mobile. I focus on practical engineering: shipping code that scales, performs, and provides a great user experience.
                    </span>
                </p>

                <p className="pl-4 block">
                    I care about pragmatic architecture, readable code, and measurable outcomes. My day-to-day includes designing APIs, implementing frontend features in TypeScript and React, and improving developer workflows with automation and testing.
                </p>

                <p>
                    <span className="text-gray-600">*/</span>
                </p>

                <div className="pt-8 grid grid-cols-2 gap-8 border-t border-white/10">
                    <div>
                        <h3 className="text-white text-xs uppercase tracking-widest mb-4">Tech</h3>
                        <ul className="space-y-1">
                            <li>TypeScript / React</li>
                            <li>React Native CLI / EXPO</li>
                            <li>JavaScript / Node.js</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white text-xs uppercase tracking-widest mb-4">Interests</h3>
                        <ul className="space-y-1">
                            <li>Procedural Gen</li>
                            <li>Game Development</li>
                            <li>IOT (Internet of Things)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};