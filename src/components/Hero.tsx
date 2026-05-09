import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // Nodes (relay points)
    const nodePositions: THREE.Vector3[] = [];
    const nodeCount = 22;
    const nodeGroup = new THREE.Group();

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 6 + Math.random() * 4;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 3;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 4;
      nodePositions.push(new THREE.Vector3(x, y, z));

      const geo = new THREE.SphereGeometry(0.12, 16, 16);
      const mat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      nodeGroup.add(mesh);

      // Glow ring
      const ringGeo = new THREE.RingGeometry(0.22, 0.3, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xf97316,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(x, y, z);
      nodeGroup.add(ring);
    }
    scene.add(nodeGroup);

    // Lines between nodes
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.25,
    });
    for (let i = 0; i < nodeCount; i++) {
      const j = (i + 1) % nodeCount;
      const pts = [nodePositions[i], nodePositions[j]];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      scene.add(new THREE.Line(geo, lineMat));
    }
    // Some cross lines
    for (let i = 0; i < 12; i++) {
      const a = Math.floor(Math.random() * nodeCount);
      const b = Math.floor(Math.random() * nodeCount);
      const pts = [nodePositions[a], nodePositions[b]];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      scene.add(new THREE.Line(geo, lineMat));
    }

    // Floating packages (boxes)
    const boxes: { mesh: THREE.Mesh; vel: THREE.Vector3; rotVel: THREE.Vector3 }[] = [];
    const boxColors = [0xf97316, 0x3b82f6, 0x06b6d4, 0xfbbf24];
    for (let i = 0; i < 18; i++) {
      const s = 0.25 + Math.random() * 0.35;
      const geo = new THREE.BoxGeometry(s, s * 0.7, s * 0.85);
      const edges = new THREE.EdgesGeometry(geo);
      const mat = new THREE.LineBasicMaterial({
        color: boxColors[i % boxColors.length],
        transparent: true,
        opacity: 0.7,
      });
      const mesh = new THREE.LineSegments(edges, mat) as unknown as THREE.Mesh;
      mesh.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      );
      scene.add(mesh);
      boxes.push({
        mesh,
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.003
        ),
        rotVel: new THREE.Vector3(
          Math.random() * 0.008,
          Math.random() * 0.012,
          Math.random() * 0.006
        ),
      });
    }

    // Particles
    const particleCount = 400;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.06, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(pGeo, pMat));

    let mouseX = 0;
    let mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    let frame = 0;
    const animate = () => {
      const id = requestAnimationFrame(animate);
      frame++;

      nodeGroup.rotation.y += 0.0015;
      nodeGroup.rotation.x = Math.sin(frame * 0.0008) * 0.15;

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      boxes.forEach(({ mesh, vel, rotVel }) => {
        mesh.position.add(vel);
        mesh.rotation.x += rotVel.x;
        mesh.rotation.y += rotVel.y;
        mesh.rotation.z += rotVel.z;
        if (Math.abs(mesh.position.x) > 10) vel.x *= -1;
        if (Math.abs(mesh.position.y) > 6) vel.y *= -1;
        if (Math.abs(mesh.position.z) > 5) vel.z *= -1;
      });

      renderer.render(scene, camera);

      return id;
    };
    const animId = { id: 0 };
    const raf = requestAnimationFrame(function loop() {
      animId.id = requestAnimationFrame(loop);
      frame++;

      nodeGroup.rotation.y += 0.0015;
      nodeGroup.rotation.x = Math.sin(frame * 0.0008) * 0.15;

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      boxes.forEach(({ mesh, vel, rotVel }) => {
        mesh.position.add(vel);
        mesh.rotation.x += rotVel.x;
        mesh.rotation.y += rotVel.y;
        mesh.rotation.z += rotVel.z;
        if (Math.abs(mesh.position.x) > 10) vel.x *= -1;
        if (Math.abs(mesh.position.y) > 6) vel.y *= -1;
        if (Math.abs(mesh.position.z) > 5) vel.z *= -1;
      });

      renderer.render(scene, camera);
    });

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(animId.id);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      animate();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}

const floatingCards = [
  { label: '12 Milliards DH', sub: 'e-commerce Maroc', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', delay: 0 },
  { label: '+30%', sub: 'Croissance annuelle', color: 'from-orange-500/20 to-amber-500/20', border: 'border-orange-500/30', delay: 0.15 },
  { label: '15–25%', sub: 'Échec livraison', color: 'from-red-500/20 to-rose-500/20', border: 'border-red-500/30', delay: 0.3 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#040810]">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <ThreeScene />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(59,130,246,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_50%,rgba(249,115,22,0.07),transparent)]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          Marketplace Logistique Intelligente
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9 }}
          className="text-[clamp(4rem,12vw,9rem)] font-black leading-none tracking-tighter text-white mb-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Yoo<span className="text-orange-500">Do</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
         className="text-xl md:text-2xl text-white font-light tracking-wide mb-4"
        >
          You do less. We do more.
        </motion.p>


        {/* Floating stat cards */}
        <div className="flex flex-wrap justify-center gap-4">
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + card.delay, duration: 0.7 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className={`px-5 py-4 rounded-2xl border ${card.border} bg-gradient-to-br ${card.color} backdrop-blur-md`}
            >
              <div className="text-white font-bold text-lg">{card.label}</div>
              <div className="text-white/50 text-xs mt-0.5">{card.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#040810] to-transparent" />
    </section>
  );
}
