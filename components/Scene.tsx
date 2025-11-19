import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Augment JSX namespace to support R3F intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      icosahedronGeometry: any;
      meshBasicMaterial: any;
      octahedronGeometry: any;
      gridHelper: any;
      ambientLight: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      icosahedronGeometry: any;
      meshBasicMaterial: any;
      octahedronGeometry: any;
      gridHelper: any;
      ambientLight: any;
    }
  }
}

const RotatingShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = state.clock.getElapsedTime() * -0.2;
      meshRef2.current.rotation.y = state.clock.getElapsedTime() * -0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color="white" wireframe />
      </mesh>
      <mesh ref={meshRef2}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#333" wireframe />
      </mesh>
    </group>
  );
};

const GridFloor = () => {
    return (
        <gridHelper args={[20, 20, 0x444444, 0x111111]} position={[0, -3, 0]} />
    )
}

interface Log {
  id: number;
  type: 'command' | 'output';
  text: string;
}

const SEQUENCE: { text: string; type: 'command' | 'output' }[] = [
  { text: 'initialize --system core', type: 'command' },
  { text: 'Loading kernel modules...', type: 'output' },
  { text: 'Mounting file systems...', type: 'output' },
  { text: 'System integrity check: OK', type: 'output' },
  { text: 'Starting visual interface...', type: 'output' },
  { text: 'access --grant visitor', type: 'command' },
  { text: 'Access granted. Welcome to the system.', type: 'output' },
  { text: 'fetch --all projects', type: 'command' },
  { text: 'Fetching data from repository...', type: 'output' },
  { text: 'Found 12 active projects.', type: 'output' },
  { text: 'rendering...', type: 'output' },
];

export const Scene = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [step, setStep] = useState(0);
  const [showGlobe, setShowGlobe] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step >= SEQUENCE.length) {
        const timer = setTimeout(() => setShowGlobe(true), 1000);
        return () => clearTimeout(timer);
    }

    const action = SEQUENCE[step];
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (action.type === 'command') {
      let i = 0;
      interval = setInterval(() => {
        setCurrentText(action.text.slice(0, i + 1));
        i++;
        if (i === action.text.length) {
          clearInterval(interval);
          timeout = setTimeout(() => {
            setLogs(prev => [...prev, { id: Date.now(), type: 'command', text: action.text }]);
            setCurrentText('');
            setStep(s => s + 1);
          }, 400);
        }
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setLogs(prev => [...prev, { id: Date.now(), type: 'output', text: action.text }]);
        setStep(s => s + 1);
      }, 600);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [step]);

  useEffect(() => {
    if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs, currentText]);

  if (showGlobe) {
      return (
        <div className="w-full h-full bg-black/90 border border-white/10 rounded-lg shadow-2xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full z-10 p-6 pointer-events-none">
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-gray-500">system.core — visualizer</span>
                </div>
            </div>
            <Canvas className="w-full h-full">
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <ambientLight intensity={0.5} />
                <RotatingShape />
                <GridFloor />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
      )
  }

  return (
    <div className="w-full h-full bg-black/90 p-6 font-mono text-sm md:text-base overflow-hidden flex flex-col border border-white/10 rounded-lg shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-gray-500">system.core — zsh</span>
      </div>
      
      <div ref={containerRef} className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
        {logs.map((log) => (
          <div key={log.id} className={`${log.type === 'command' ? 'text-white' : 'text-gray-400'}`}>
            {log.type === 'command' && <span className="text-green-500 mr-2">➜  ~</span>}
            {log.text}
          </div>
        ))}
        
        {step < SEQUENCE.length && SEQUENCE[step].type === 'command' && (
          <div className="text-white">
            <span className="text-green-500 mr-2">➜  ~</span>
            {currentText}
            <span className="animate-pulse">_</span>
          </div>
        )}
        
        {step >= SEQUENCE.length && (
           <div className="text-white">
            <span className="text-green-500 mr-2">➜  ~</span>
            <span className="animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  );
};