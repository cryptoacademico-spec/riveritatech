import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Server3DViewerProps {
  scrollProgress?: number;
}

export const Server3DViewer: React.FC<Server3DViewerProps> = ({ scrollProgress = 0 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [internalProgress, setInternalProgress] = useState(scrollProgress);
  const [activeStage, setActiveStage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Sync scrollProgress with internal state
  useEffect(() => {
    setInternalProgress(scrollProgress);
    if (scrollProgress < 0.2) setActiveStage(1);
    else if (scrollProgress < 0.45) setActiveStage(2);
    else if (scrollProgress < 0.7) setActiveStage(3);
    else if (scrollProgress < 0.9) setActiveStage(4);
    else setActiveStage(5);
  }, [scrollProgress]);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 500;
    const height = mountRef.current.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(6, 4, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 3, 20);
    cyanLight.position.set(-5, 5, 5);
    scene.add(cyanLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 2, 20);
    emeraldLight.position.set(5, -2, -5);
    scene.add(emeraldLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 4, 15);
    blueLight.position.set(0, 3, 0);
    scene.add(blueLight);

    // Group Container
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- MATERIALS ---
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2,
    });

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.3,
    });

    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      metalness: 0.3,
      roughness: 0.5,
    });

    const cpuMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.1,
    });

    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      metalness: 0.8,
      roughness: 0.3,
    });

    const ramMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.5,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2,
    });

    const nvmeMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.7,
      roughness: 0.3,
    });

    const glowBlueMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    const glowEmeraldMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
    });

    const esxiVisorMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      transmission: 0.6,
      opacity: 0.85,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1,
      emissive: 0x0369a1,
      emissiveIntensity: 0.3,
    });

    // --- PARTS CREATION ---

    // 1. BASE CHASSIS (Fixed)
    const chassisGroup = new THREE.Group();
    const baseBoxGeo = new THREE.BoxGeometry(4.5, 0.4, 3.2);
    const chassisMesh = new THREE.Mesh(baseBoxGeo, darkMetalMat);
    chassisMesh.castShadow = true;
    chassisMesh.receiveShadow = true;
    chassisGroup.add(chassisMesh);

    // Rack Ears
    const earGeo = new THREE.BoxGeometry(0.3, 0.6, 0.4);
    const earL = new THREE.Mesh(earGeo, metalMat);
    earL.position.set(-2.4, 0, 1.5);
    const earR = new THREE.Mesh(earGeo, metalMat);
    earR.position.set(2.4, 0, 1.5);
    chassisGroup.add(earL, earR);

    // Handles
    const handleGeo = new THREE.TorusGeometry(0.2, 0.04, 8, 16);
    const handleL = new THREE.Mesh(handleGeo, metalMat);
    handleL.rotation.y = Math.PI / 2;
    handleL.position.set(-2.5, 0, 1.4);
    const handleR = new THREE.Mesh(handleGeo, metalMat);
    handleR.rotation.y = Math.PI / 2;
    handleR.position.set(2.5, 0, 1.4);
    chassisGroup.add(handleL, handleR);

    mainGroup.add(chassisGroup);

    // 2. MOTHERBOARD (Stage 1 Assembly - slides from top/back)
    const moboGroup = new THREE.Group();
    const moboGeo = new THREE.BoxGeometry(4.0, 0.1, 2.6);
    const moboMesh = new THREE.Mesh(moboGeo, pcbMat);
    moboMesh.position.y = 0.25;
    moboGroup.add(moboMesh);

    // PCIe Slots
    for (let i = -1.5; i <= 1.5; i += 1.0) {
      const pcieGeo = new THREE.BoxGeometry(0.12, 0.15, 0.8);
      const pcie = new THREE.Mesh(pcieGeo, metalMat);
      pcie.position.set(i, 0.35, -0.6);
      moboGroup.add(pcie);
    }
    mainGroup.add(moboGroup);

    // 3. DUAL CPUS & COOLERS (Stage 2 - mounts vertically)
    const cpuGroup = new THREE.Group();
    [-1.0, 1.0].forEach((xPos) => {
      // Socket & CPU
      const socketGeo = new THREE.BoxGeometry(0.7, 0.1, 0.7);
      const socket = new THREE.Mesh(socketGeo, cpuMat);
      socket.position.set(xPos, 0.35, 0.3);

      // Copper Heat Sink
      const sinkGeo = new THREE.BoxGeometry(0.65, 0.5, 0.65);
      const sink = new THREE.Mesh(sinkGeo, copperMat);
      sink.position.set(xPos, 0.6, 0.3);

      // Glowing Cooling Fan Top
      const fanTopGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.05, 16);
      const fanTop = new THREE.Mesh(fanTopGeo, glowBlueMat);
      fanTop.position.set(xPos, 0.87, 0.3);

      cpuGroup.add(socket, sink, fanTop);
    });
    mainGroup.add(cpuGroup);

    // 4. RAM DIMM STICKS (Stage 3 - slides into slots)
    const ramGroup = new THREE.Group();
    [-1.6, -1.4, -0.6, -0.4, 0.4, 0.6, 1.4, 1.6].forEach((xPos) => {
      const ramGeo = new THREE.BoxGeometry(0.06, 0.35, 0.7);
      const ram = new THREE.Mesh(ramGeo, ramMat);
      ram.position.set(xPos, 0.5, 0.3);
      ramGroup.add(ram);
    });
    mainGroup.add(ramGroup);

    // 5. NVME SSD STORAGE BAYS (Stage 4 - slides from front)
    const nvmeGroup = new THREE.Group();
    const driveCoords = [-1.8, -1.0, -0.2, 0.6, 1.4];
    driveCoords.forEach((xPos) => {
      const bayGeo = new THREE.BoxGeometry(0.7, 0.22, 1.1);
      const bay = new THREE.Mesh(bayGeo, nvmeMat);
      bay.position.set(xPos, 0.28, 1.2);

      // LED Light
      const ledGeo = new THREE.SphereGeometry(0.03, 8, 8);
      const led = new THREE.Mesh(ledGeo, glowEmeraldMat);
      led.position.set(xPos + 0.28, 0.32, 1.76);
      nvmeGroup.add(bay, led);
    });
    mainGroup.add(nvmeGroup);

    // 6. VMWARE ESXi HOLOGRAPHIC TOP COVER (Stage 5 - lowers onto server)
    const esxiGroup = new THREE.Group();
    const coverGeo = new THREE.BoxGeometry(4.4, 0.08, 3.0);
    const coverMesh = new THREE.Mesh(coverGeo, esxiVisorMat);
    coverMesh.position.y = 1.0;
    esxiGroup.add(coverMesh);

    // Glowing Broadcom / VMware status stripes
    const stripeGeo = new THREE.BoxGeometry(4.2, 0.02, 0.15);
    const stripeBlue = new THREE.Mesh(stripeGeo, glowBlueMat);
    stripeBlue.position.set(0, 1.05, 0.4);
    const stripeEmerald = new THREE.Mesh(stripeGeo, glowEmeraldMat);
    stripeEmerald.position.set(0, 1.05, -0.4);
    esxiGroup.add(stripeBlue, stripeEmerald);

    mainGroup.add(esxiGroup);

    // Camera initial position
    camera.lookAt(0, 0.3, 0);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation target based on progress
      const targetP = internalProgress;

      // Stage 1: Motherboard Y offset (1.5 -> 0)
      moboGroup.position.y = THREE.MathUtils.lerp(moboGroup.position.y, (1 - Math.min(targetP * 2, 1)) * 1.5, 0.1);

      // Stage 2: CPUs Y offset (2.5 -> 0)
      const cpuP = Math.max(0, Math.min((targetP - 0.2) * 2.5, 1));
      cpuGroup.position.y = THREE.MathUtils.lerp(cpuGroup.position.y, (1 - cpuP) * 2.5, 0.1);

      // Stage 3: RAM Y offset (2.0 -> 0)
      const ramP = Math.max(0, Math.min((targetP - 0.4) * 2.5, 1));
      ramGroup.position.y = THREE.MathUtils.lerp(ramGroup.position.y, (1 - ramP) * 2.0, 0.1);

      // Stage 4: NVMe Z offset (3.0 -> 0)
      const nvmeP = Math.max(0, Math.min((targetP - 0.6) * 2.5, 1));
      nvmeGroup.position.z = THREE.MathUtils.lerp(nvmeGroup.position.z, (1 - nvmeP) * 3.0, 0.1);

      // Stage 5: ESXi Cover Y offset (3.5 -> 0)
      const esxiP = Math.max(0, Math.min((targetP - 0.8) * 5.0, 1));
      esxiGroup.position.y = THREE.MathUtils.lerp(esxiGroup.position.y, (1 - esxiP) * 3.5, 0.1);

      // Gentle floating rotation
      if (!isHovered) {
        mainGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.25 + 0.3;
        mainGroup.rotation.x = Math.cos(elapsedTime * 0.4) * 0.1 + 0.15;
      } else {
        mainGroup.rotation.y = THREE.MathUtils.lerp(mainGroup.rotation.y, 0.5, 0.05);
        mainGroup.rotation.x = THREE.MathUtils.lerp(mainGroup.rotation.x, 0.2, 0.05);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse drag interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      mainGroup.rotation.y += deltaX * 0.01;
      mainGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElem = mountRef.current;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [internalProgress, isHovered]);

  return (
    <div 
      className="relative w-full h-[450px] lg:h-[550px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* STAGE HUD OVERLAY */}
      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-20">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </div>
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold">
            ESXi Server 3D Assembly
          </div>
          <div className="text-xs font-bold text-white">
            {activeStage === 1 && "Fase 1: Chasis & Motherboard"}
            {activeStage === 2 && "Fase 2: Procesadores Duales Xeon/Epyc"}
            {activeStage === 3 && "Fase 3: Módulos de Memoria RAM DIMM"}
            {activeStage === 4 && "Fase 4: Bahías de Almacenamiento NVMe"}
            {activeStage >= 5 && "Fase 5: VMware ESXi 8.0/9.0 Active"}
          </div>
        </div>
      </div>

      {/* INSTRUCTION OVERLAY */}
      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[11px] font-mono text-slate-300 pointer-events-none flex items-center gap-2">
        <span className="text-blue-400 font-bold">💡 Tip:</span> Haz Scroll o arrastra con el Mouse para rotar en 360°
      </div>
    </div>
  );
};
