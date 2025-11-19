import React from 'react';
import { ArrowUpRight, Box, Terminal, Sparkles, LayoutTemplate, MapPin, FileText, Smartphone, Monitor } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  tech: string;
  href: string;
  colSpan?: 'col-span-1' | 'col-span-2';
  icon?: React.ReactNode;
  graphic?: React.ReactNode;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, description, tech, href, colSpan = 'col-span-1', icon, graphic }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`${colSpan} group relative border border-white/10 bg-black hover:border-white/40 transition-all duration-300 overflow-hidden min-h-[280px] flex flex-col justify-between`}
    >
      {/* Texture Background */}
      <div className="absolute inset-0 bg-dither opacity-10 group-hover:opacity-20 transition-opacity"></div>
      
      {/* Hover Highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Content */}
      <div className="p-6 relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 border border-white/10 bg-black/50">
            {icon || <Box className="w-5 h-5 text-gray-400" />}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
            {category}
          </span>
        </div>

        {/* Graphic Area */}
        <div className="flex-1 flex items-center justify-center py-6 opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
            {graphic}
        </div>

        <div className="mt-auto">
          <h3 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform flex items-center gap-2">
            {title}
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-[10px] text-gray-400 font-mono mb-2 uppercase tracking-wider border-b border-white/10 pb-2 inline-block">
            {tech}
          </p>
          <p className="text-gray-400 text-sm font-mono line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 right-0 w-2 h-2 border-b border-l border-white/20"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-t border-r border-white/20"></div>
    </a>
  );
};

/* Custom Graphics Components */

const OSWindowGraphic = () => (
    <div className="relative w-48 h-24">
        {/* Back Window */}
        <div className="absolute top-0 right-0 w-32 h-20 border border-white/20 bg-black/80 z-0">
            <div className="h-4 border-b border-white/20 flex items-center px-2 gap-1">
                <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            </div>
        </div>
        {/* Front Window */}
        <div className="absolute bottom-0 left-0 w-32 h-20 border border-white/60 bg-black z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <div className="h-4 border-b border-white/60 flex items-center px-2 gap-1 bg-white/10">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            </div>
            <div className="p-2 space-y-1">
                <div className="w-1/2 h-px bg-white/50"></div>
                <div className="w-3/4 h-px bg-white/30"></div>
                <div className="w-1/3 h-px bg-white/30"></div>
            </div>
        </div>
    </div>
);

const WebLayoutGraphic = () => (
    <div className="w-32 h-20 border border-white/30 flex bg-black/50">
        <div className="w-1/3 border-r border-white/30 p-1 space-y-1">
            <div className="w-full h-px bg-white/40"></div>
            <div className="w-2/3 h-px bg-white/20"></div>
            <div className="w-3/4 h-px bg-white/20"></div>
        </div>
        <div className="w-2/3 flex items-center justify-center">
            <div className="w-8 h-8 border border-dashed border-white/40 rotate-45"></div>
        </div>
    </div>
);

const PixelGridGraphic = () => (
    <div className="grid grid-cols-6 gap-1 p-2 border border-white/10 bg-black/50">
        {[...Array(24)].map((_, i) => (
            <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-[1px] transition-all duration-500 ${
                    i % 5 === 0 ? 'bg-white' : 
                    i % 3 === 0 ? 'bg-white/40' : 
                    'bg-white/10'
                } group-hover:scale-110`}
            ></div>
        ))}
    </div>
);

const MapRadarGraphic = () => (
    <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 border border-white/20 rounded-full opacity-50"></div>
        <div className="absolute inset-4 border border-dashed border-white/30 rounded-full animate-spin-slow duration-[10s]"></div>
        <div className="w-1 h-1 bg-white rounded-full absolute"></div>
        <div className="w-1 h-1 bg-white/50 rounded-full absolute top-6 right-6"></div>
        <div className="w-1 h-1 bg-white/30 rounded-full absolute bottom-8 left-4"></div>
        <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45"></div>
        <div className="absolute h-24 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent rotate-45"></div>
    </div>
);

const ListGraphic = () => (
    <div className="w-24 h-28 border-x border-white/20 bg-black/50 flex flex-col py-2 gap-2">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center px-3 gap-2">
                 <div className="w-2 h-2 border border-white/40"></div>
                 <div className="h-px flex-1 bg-white/20"></div>
            </div>
        ))}
        <div className="mt-auto px-3 flex justify-center">
             <div className="w-4 h-4 rounded-full border border-white/30"></div>
        </div>
    </div>
);

export const BentoGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
        <h2 className="text-4xl font-bold tracking-tight">PROJECTS</h2>
        <span className="font-mono text-xs text-gray-500">INDEX: 001-005</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(280px,auto)]">
        
        <ProjectCard
          colSpan="col-span-2"
          title="HackOS"
          category="Operating System"
          tech="React (Vite) • Firebase • IndexedDB"
          href="https://darknet-hackos.netlify.app/"
          icon={<Monitor className="w-5 h-5" />}
          description="A Linux-inspired browser OS featuring a fully functional window manager, file system, terminal emulator, and persistent state management."
          graphic={<OSWindowGraphic />}
        />
        
        <ProjectCard
          title="PixelAlchemy"
          category="AI Tooling"
          tech="Next.js • Gemini API"
          href="https://pixel-alachemy.netlify.app/editor"
          icon={<Sparkles className="w-5 h-5" />}
          description="AI-powered image analyzer and editor. Generates suggestions and edits images via natural language prompts."
          graphic={<PixelGridGraphic />}
        />

        <ProjectCard
          title="WebLab"
          category="Education"
          tech="Next.js • Firebase"
          href="https://code-canvass.netlify.app/"
          icon={<LayoutTemplate className="w-5 h-5" />}
          description="Visual coding playground for recreating UI components with real-time feedback."
          graphic={<WebLayoutGraphic />}
        />
        
        <ProjectCard
          title="ChaiHub"
          category="Mobile / Discovery"
          tech="React Native CLI"
          href="https://github.com/Kartik-A-Patil/ChaiHub"
          icon={<MapPin className="w-5 h-5" />}
          description="Mobile application for discovering local tea and snack spots with location-based features."
          graphic={<MapRadarGraphic />}
        />

        <ProjectCard
          title="NoteFreze"
          category="Productivity"
          tech="React Native (Expo)"
          href="https://github.com/Kartik-A-Patil/NoteFreze"
          icon={<FileText className="w-5 h-5" />}
          description="Minimalist note-taking and to-do application focused on speed and clean typography."
          graphic={<ListGraphic />}
        />
        
      </div>
    </section>
  );
};
