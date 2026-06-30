"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Line } from "@react-three/drei";
import * as THREE from "three";

interface SantaraModelProps {
  activePart: string | null;
  setActivePart: (part: string | null) => void;
}

function GreenhouseScene({ activePart, setActivePart }: SantaraModelProps) {
  const greenhouseRef = useRef<THREE.Group>(null);
  const fan1Ref = useRef<THREE.Group>(null);
  const fan2Ref = useRef<THREE.Group>(null);
  
  // Slowly rotate the entire group if no parts are selected
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (greenhouseRef.current && !activePart) {
      greenhouseRef.current.rotation.y = elapsed * 0.12;
    }

    // Spin fans if ventilation is active, otherwise idle slow rotation
    const spinSpeed = activePart === "Ventilasi" ? 18 : 1;
    if (fan1Ref.current) {
      fan1Ref.current.rotation.z = elapsed * spinSpeed;
    }
    if (fan2Ref.current) {
      fan2Ref.current.rotation.z = elapsed * spinSpeed;
    }
  });

  const frameColor = "#555555"; // Metal/aluminum silver-grey frame
  const glassColor = "#ebf5fb";
  const activeColor = "#B5D300"; // Young rice (active glow)
  const highlightColor = "#F3CE34"; // Golden paddy
  
  // Render small plants helper (trenches outside)
  const renderRowPlants = (startX: number, startZ: number, count: number, stepZ: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <group key={i} position={[startX, -1.38, startZ + i * stepZ]}>
        {/* Tiny crop shoots */}
        <mesh>
          <coneGeometry args={[0.04, 0.16, 4]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.6} />
        </mesh>
        <mesh position={[0.02, 0.02, 0]} rotation={[0, 0, 0.2]}>
          <coneGeometry args={[0.02, 0.12, 4]} />
          <meshStandardMaterial color="#3b7a57" roughness={0.6} />
        </mesh>
      </group>
    ));
  };

  return (
    <group ref={greenhouseRef}>
      {/* ======================================================== */}
      {/* 1. SOIL SLAB GROUND & TRENCHES                           */}
      {/* ======================================================== */}
      {/* Thick brown soil slab base */}
      <mesh position={[0, -1.6, 0]}>
        <boxGeometry args={[9, 0.4, 7]} />
        <meshStandardMaterial color="#402e2b" roughness={0.9} />
      </mesh>

      {/* Mud/Water layer on top of soil block */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.39, 0]}>
        <planeGeometry args={[8.9, 6.9]} />
        <meshStandardMaterial color="#281e1c" roughness={0.9} />
      </mesh>

      {/* Grid pattern mimicking agricultural fields */}
      <gridHelper args={[8.8, 14, "#054E00", "#5c4033"]} position={[0, -1.38, 0]} material-opacity={0.12} material-transparent />

      {/* Mud trenches with young crop rows (Padi) */}
      {/* Front Row (Left of door) */}
      {renderRowPlants(-1.8, 2.8, 8, 0.22)}
      {renderRowPlants(-1.4, 2.8, 8, 0.22)}
      {/* Front Row (Right of door) */}
      {renderRowPlants(1.4, 2.8, 8, 0.22)}
      {renderRowPlants(1.8, 2.8, 8, 0.22)}
      {/* Side Left Rows */}
      {renderRowPlants(-3.9, -2.8, 15, 0.38)}
      {renderRowPlants(-3.6, -2.8, 15, 0.38)}
      {/* Side Right Rows */}
      {renderRowPlants(3.6, -2.8, 15, 0.38)}
      {renderRowPlants(3.9, -2.8, 15, 0.38)}

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.1}>
        
        {/* ======================================================== */}
        {/* 2. GREENHOUSE METAL & GLASS STRUCTURE                    */}
        {/* ======================================================== */}
        {/* Concrete/Metal base perimeter foundation */}
        <mesh position={[0, -1.33, 0]}>
          <boxGeometry args={[5, 0.14, 3.8]} />
          <meshStandardMaterial color="#7f8c8d" metalness={0.7} roughness={0.4} />
        </mesh>
        
        {/* Vertical frame structural pillars */}
        {/* Corners */}
        {[-2.4, 2.4].map((x) =>
          [-1.8, 1.8].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, -0.2, z]}>
              <cylinderGeometry args={[0.05, 0.05, 2.1]} />
              <meshStandardMaterial color={frameColor} metalness={0.9} roughness={0.2} />
            </mesh>
          ))
        )}
        {/* Middle support pillars */}
        {[-1.2, 0, 1.2].map((x) => (
          <group key={x}>
            <mesh position={[x, -0.2, -1.8]}>
              <cylinderGeometry args={[0.04, 0.04, 2.1]} />
              <meshStandardMaterial color={frameColor} metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[x, -0.2, 1.8]}>
              <cylinderGeometry args={[0.04, 0.04, 2.1]} />
              <meshStandardMaterial color={frameColor} metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Front Door Frame */}
        <mesh position={[0, -0.2, 1.8]}>
          <boxGeometry args={[0.9, 2.1, 0.06]} />
          <meshStandardMaterial color="#054E00" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Glass door pane */}
        <mesh position={[0, -0.2, 1.8]}>
          <planeGeometry args={[0.78, 1.95]} />
          <meshPhysicalMaterial color={glassColor} transparent opacity={0.15} transmission={0.6} roughness={0.1} />
        </mesh>

        {/* Roof structure (slanted gable frames) */}
        <Line points={[[-2.4, 0.85, -1.8], [0, 1.9, -1.8], [2.4, 0.85, -1.8]]} color={frameColor} lineWidth={3} />
        <Line points={[[-2.4, 0.85, 1.8], [0, 1.9, 1.8], [2.4, 0.85, 1.8]]} color={frameColor} lineWidth={3} />
        <Line points={[[-2.4, 0.85, -1.8], [-2.4, 0.85, 1.8]]} color={frameColor} lineWidth={2} />
        <Line points={[[2.4, 0.85, -1.8], [2.4, 0.85, 1.8]]} color={frameColor} lineWidth={2} />
        <Line points={[[0, 1.9, -1.8], [0, 1.9, 1.8]]} color={frameColor} lineWidth={3} />
        
        {/* Intermediate roof slant beams */}
        {[-1.2, 0, 1.2].map((x) => (
          <Line key={x} points={[[x, 0.85, -1.8], [0, 1.9, -1.8], [x, 0.85, 1.8], [0, 1.9, 1.8]]} color={frameColor} lineWidth={1.5} />
        ))}

        {/* Semi-transparent Outer Glass Shell */}
        {/* Lower box walls */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[4.8, 2.1, 3.6]} />
          <meshPhysicalMaterial 
            color={glassColor} 
            transparent 
            opacity={0.12} 
            roughness={0.08}
            metalness={0.1}
            transmission={0.8}
            ior={1.45}
            thickness={0.2}
          />
        </mesh>
        {/* Slanted left roof glass */}
        <mesh position={[-1.2, 1.38, 0]} rotation={[0, 0, -Math.PI / 7.6]}>
          <planeGeometry args={[2.55, 3.6]} />
          <meshPhysicalMaterial color={glassColor} transparent opacity={0.15} transmission={0.7} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>
        {/* Slanted right roof glass */}
        <mesh position={[1.2, 1.38, 0]} rotation={[0, 0, Math.PI / 7.6]}>
          <planeGeometry args={[2.55, 3.6]} />
          <meshPhysicalMaterial color={glassColor} transparent opacity={0.15} transmission={0.7} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>

        {/* ======================================================== */}
        {/* 3. EXTERNAL SOLAR ARRAY & BATTERY (Left Side)            */}
        {/* ======================================================== */}
        <group 
          position={[-3.3, -0.4, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setActivePart(activePart === "Solar Panel" ? null : "Solar Panel");
          }}
        >
          {/* Slanted support frame */}
          <mesh position={[0.2, -0.5, -0.8]} rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.03, 0.03, 1.4]} />
            <meshStandardMaterial color={frameColor} metalness={0.8} />
          </mesh>
          <mesh position={[0.2, -0.5, 0.8]} rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.03, 0.03, 1.4]} />
            <meshStandardMaterial color={frameColor} metalness={0.8} />
          </mesh>
          <mesh position={[-0.4, -0.7, -0.8]}>
            <cylinderGeometry args={[0.03, 0.03, 1.0]} />
            <meshStandardMaterial color={frameColor} metalness={0.8} />
          </mesh>
          <mesh position={[-0.4, -0.7, 0.8]}>
            <cylinderGeometry args={[0.03, 0.03, 1.0]} />
            <meshStandardMaterial color={frameColor} metalness={0.8} />
          </mesh>

          {/* Large Slanted Solar Panel Grid */}
          <mesh position={[-0.1, -0.1, 0]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[1.5, 0.06, 2.6]} />
            <meshStandardMaterial 
              color={activePart === "Solar Panel" ? activeColor : "#0d1b2a"} 
              roughness={0.15} 
              metalness={0.9} 
            />
          </mesh>
          <gridHelper 
            args={[2.6, 6, "#B5D300", "#ffffff"]} 
            position={[-0.07, -0.06, 0]} 
            rotation={[Math.PI / 2, 0, Math.PI / 6]} 
            material-opacity={0.3} 
            material-transparent 
          />

          {/* Yellow-Bolt Battery Box on the Ground */}
          <mesh position={[0.2, -0.85, 0.8]}>
            <boxGeometry args={[0.6, 0.45, 0.45]} />
            <meshStandardMaterial color={activePart === "Solar Panel" ? activeColor : "#34495e"} roughness={0.5} />
          </mesh>
          {/* Top terminals */}
          <mesh position={[0.1, -0.6, 0.7]}>
            <cylinderGeometry args={[0.03, 0.03, 0.06]} />
            <meshStandardMaterial color="#c0392b" />
          </mesh>
          <mesh position={[0.3, -0.6, 0.7]}>
            <cylinderGeometry args={[0.03, 0.03, 0.06]} />
            <meshStandardMaterial color="#2c3e50" />
          </mesh>
          {/* Yellow Bolt graphic placeholder */}
          <mesh position={[0.51, -0.85, 0.8]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.15, 0.25]} />
            <meshBasicMaterial color={highlightColor} />
          </mesh>
        </group>

        {/* ======================================================== */}
        {/* 4. BLUE WATER TANK & GUTTER PIPE (Right Side)            */}
        {/* ======================================================== */}
        <group position={[2.9, -0.75, 1.1]}>
          {/* Support pad */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.42, 0.42, 0.08, 12]} />
            <meshStandardMaterial color="#7f8c8d" />
          </mesh>
          {/* Cylindrical blue water tank */}
          <mesh>
            <cylinderGeometry args={[0.36, 0.36, 0.95, 16]} />
            <meshStandardMaterial color="#2c3e50" roughness={0.3} />
          </mesh>
          {/* Horizontal reinforcement rings */}
          {[-0.3, 0, 0.3].map((y) => (
            <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.37, 0.015, 8, 24]} />
              <meshStandardMaterial color="#1a252f" />
            </mesh>
          ))}
          {/* Connected Gutter Pipe */}
          <Line points={[[-0.5, 1.4, 0], [0, 1.4, 0], [0, 0.45, 0]]} color="#7f8c8d" lineWidth={2.5} />
        </group>

        {/* ======================================================== */}
        {/* 5. ROOF COMMUNICATIONS HUB & SATELLITE DISH             */}
        {/* ======================================================== */}
        <group position={[0, 1.9, 0]}>
          {/* IoT Gateway Box on Roof Ridge */}
          <mesh position={[0, 0.1, -0.4]}>
            <boxGeometry args={[0.32, 0.12, 0.22]} />
            <meshStandardMaterial color="#bdc3c7" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* 4 Antennas */}
          {[-0.1, 0.1].map((x) =>
            [-0.06, 0.06].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 0.28, -0.4 + z]}>
                <cylinderGeometry args={[0.008, 0.008, 0.3]} />
                <meshStandardMaterial color="#2c3e50" />
              </mesh>
            ))
          )}

          {/* Starlink Satellite Dish */}
          <mesh position={[0, 0.1, 0.4]}>
            <cylinderGeometry args={[0.015, 0.015, 0.2]} />
            <meshStandardMaterial color="#bdc3c7" />
          </mesh>
          <mesh position={[0, 0.25, 0.4]} rotation={[0.4, 0, 0.2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.02, 24]} />
            <meshStandardMaterial color="#ecf0f1" roughness={0.4} />
          </mesh>
        </group>

        {/* ======================================================== */}
        {/* 6. DOUBLE-LAYER SEEDLING SHELVES & CROPS (Inside)       */}
        {/* ======================================================== */}
        <group 
          onClick={(e) => {
            e.stopPropagation();
            setActivePart(activePart === "Hidroponik" ? null : "Hidroponik");
          }}
        >
          {/* Left Double-layer shelf */}
          {[-1.3, -0.65].map((y) => (
            <mesh key={y} position={[-1.4, y, 0]}>
              <boxGeometry args={[1.1, 0.04, 2.7]} />
              <meshStandardMaterial color={activePart === "Hidroponik" ? activeColor : "#7f8c8d"} metalness={0.5} />
            </mesh>
          ))}
          {/* Right Double-layer shelf */}
          {[-1.3, -0.65].map((y) => (
            <mesh key={y} position={[1.4, y, 0]}>
              <boxGeometry args={[1.1, 0.04, 2.7]} />
              <meshStandardMaterial color={activePart === "Hidroponik" ? activeColor : "#7f8c8d"} metalness={0.5} />
            </mesh>
          ))}

          {/* Seedling Trays & Green Sprout crops */}
          {/* Left Trays */}
          {[-1.3, -0.65].map((y) => 
            [-1.0, 0, 1.0].map((z) => (
              <group key={`${y}-${z}`}>
                {/* Black Tray */}
                <mesh position={[-1.4, y + 0.06, z]}>
                  <boxGeometry args={[0.9, 0.08, 0.8]} />
                  <meshStandardMaterial color="#111111" roughness={0.9} />
                </mesh>
                {/* Plant rows in tray */}
                {[-0.3, 0, 0.3].map((px) =>
                  [-0.2, 0, 0.2].map((pz) => (
                    <mesh key={`${px}-${pz}`} position={[-1.4 + px, y + 0.16, z + pz]}>
                      <sphereGeometry args={[0.05, 6, 6]} />
                      <meshStandardMaterial color="#2d6a4f" roughness={0.7} />
                    </mesh>
                  ))
                )}
              </group>
            ))
          )}

          {/* Right Trays */}
          {[-1.3, -0.65].map((y) => 
            [-1.0, 0, 1.0].map((z) => (
              <group key={`${y}-${z}`}>
                {/* Black Tray */}
                <mesh position={[1.4, y + 0.06, z]}>
                  <boxGeometry args={[0.9, 0.08, 0.8]} />
                  <meshStandardMaterial color="#111111" roughness={0.9} />
                </mesh>
                {/* Plant rows in tray */}
                {[-0.3, 0, 0.3].map((px) =>
                  [-0.2, 0, 0.2].map((pz) => (
                    <mesh key={`${px}-${pz}`} position={[1.4 + px, y + 0.16, z + pz]}>
                      <sphereGeometry args={[0.05, 6, 6]} />
                      <meshStandardMaterial color="#2d6a4f" roughness={0.7} />
                    </mesh>
                  ))
                )}
              </group>
            ))
          )}
        </group>

        {/* ======================================================== */}
        {/* 7. LED GROW LIGHTS                                       */}
        {/* ======================================================== */}
        <group 
          onClick={(e) => {
            e.stopPropagation();
            setActivePart(activePart === "LED Grow Light" ? null : "LED Grow Light");
          }}
        >
          {/* Ceiling LED tubes */}
          {[-1.1, 1.1].map((x) => (
            <group key={x}>
              {/* Backing bar */}
              <mesh position={[x, 0.8, 0]}>
                <boxGeometry args={[0.08, 0.04, 2.6]} />
                <meshStandardMaterial color="#7f8c8d" />
              </mesh>
              {/* Glowing pink tube */}
              <mesh position={[x, 0.77, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 2.5, 8]} />
                <meshBasicMaterial color={activePart === "LED Grow Light" ? "#FF00FF" : "#F3722C"} />
              </mesh>
            </group>
          ))}
        </group>

        {/* ======================================================== */}
        {/* 8. AI KERNEL MODULE (Floating center core)               */}
        {/* ======================================================== */}
        <mesh
          position={[0, 0.2, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setActivePart(activePart === "AI Module" ? null : "AI Module");
          }}
        >
          <octahedronGeometry args={[0.25]} />
          <meshStandardMaterial
            color={activePart === "AI Module" ? activeColor : highlightColor}
            emissive={activePart === "AI Module" ? activeColor : highlightColor}
            emissiveIntensity={1.8}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[0.42, 0.015, 8, 24]} />
          <meshBasicMaterial color="#054E00" transparent opacity={0.35} />
        </mesh>

        {/* ======================================================== */}
        {/* 9. VENTILATION FANS                                      */}
        {/* ======================================================== */}
        {/* Front Fan */}
        <group
          position={[0, 1.0, 1.74]}
          onClick={(e) => {
            e.stopPropagation();
            setActivePart(activePart === "Ventilasi" ? null : "Ventilasi");
          }}
        >
          {/* Fan casing */}
          <mesh>
            <boxGeometry args={[0.55, 0.55, 0.08]} />
            <meshStandardMaterial color={activePart === "Ventilasi" ? activeColor : "#34495e"} />
          </mesh>
          <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.03, 16]} />
            <meshStandardMaterial color="#7f8c8d" />
          </mesh>
          {/* Blades group */}
          <group ref={fan1Ref} position={[0, 0, 0.06]}>
            <mesh><boxGeometry args={[0.4, 0.05, 0.01]} /><meshStandardMaterial color="#bdc3c7" /></mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.4, 0.05, 0.01]} /><meshStandardMaterial color="#bdc3c7" /></mesh>
          </group>
        </group>

        {/* Back Fan */}
        <group
          position={[0, 1.0, -1.74]}
          onClick={(e) => {
            e.stopPropagation();
            setActivePart(activePart === "Ventilasi" ? null : "Ventilasi");
          }}
        >
          {/* Fan casing */}
          <mesh>
            <boxGeometry args={[0.55, 0.55, 0.08]} />
            <meshStandardMaterial color={activePart === "Ventilasi" ? activeColor : "#34495e"} />
          </mesh>
          <mesh position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.03, 16]} />
            <meshStandardMaterial color="#7f8c8d" />
          </mesh>
          {/* Blades group */}
          <group ref={fan2Ref} position={[0, 0, -0.06]}>
            <mesh><boxGeometry args={[0.4, 0.05, 0.01]} /><meshStandardMaterial color="#bdc3c7" /></mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.4, 0.05, 0.01]} /><meshStandardMaterial color="#bdc3c7" /></mesh>
          </group>
        </group>

        {/* ======================================================== */}
        {/* 10. IoT SENSORS, PUMPS & CONTROLS UNDER SHELVES          */}
        {/* ======================================================== */}
        <group
          onClick={(e) => {
            e.stopPropagation();
            setActivePart(activePart === "Sensor" ? null : "Sensor");
          }}
        >
          {/* Small grey electrical box on the front right pillar */}
          <mesh position={[1.2, -0.85, 1.76]}>
            <boxGeometry args={[0.18, 0.26, 0.12]} />
            <meshStandardMaterial color={activePart === "Sensor" ? activeColor : "#ecf0f1"} roughness={0.4} />
          </mesh>
          
          {/* Water pumps on floor under shelves */}
          <mesh position={[-1.2, -1.25, -0.6]} rotation={[0, Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.24, 12]} />
            <meshStandardMaterial color={activePart === "Sensor" ? activeColor : "#2c3e50"} />
          </mesh>
          <mesh position={[1.2, -1.25, 0.6]} rotation={[0, Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.24, 12]} />
            <meshStandardMaterial color={activePart === "Sensor" ? activeColor : "#2c3e50"} />
          </mesh>

          {/* Standalone telemetry sensory nodes in soil */}
          <mesh position={[-2.1, -1.22, 1.5]}>
            <boxGeometry args={[0.04, 0.15, 0.04]} />
            <meshStandardMaterial color="#bdc3c7" />
          </mesh>
          <mesh position={[-2.1, -1.1, 1.5]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color={activePart === "Sensor" ? activeColor : "#F3CE34"} />
          </mesh>

          <mesh position={[2.1, -1.22, -1.5]}>
            <boxGeometry args={[0.04, 0.15, 0.04]} />
            <meshStandardMaterial color="#bdc3c7" />
          </mesh>
          <mesh position={[2.1, -1.1, -1.5]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color={activePart === "Sensor" ? activeColor : "#F3CE34"} />
          </mesh>
        </group>

      </Float>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.0} />
      <pointLight position={[-10, 5, -10]} intensity={0.4} />
      <pointLight position={[0, 0.2, 0]} color={activePart === "AI Module" ? activeColor : highlightColor} intensity={2.0} distance={3.5} />
      {/* Sun glow over the solar panels */}
      <directionalLight position={[-8, 6, 2]} intensity={0.7} />
    </group>
  );
}

export default function SantaraGreenhouse3D({ activePart, setActivePart }: SantaraModelProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [5, 3.2, 5], fov: 42 }}>
        <GreenhouseScene activePart={activePart} setActivePart={setActivePart} />
        <OrbitControls 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2 - 0.02} // don't go below ground
          minPolarAngle={Math.PI / 6}
        />
        <Stars radius={100} depth={50} count={200} factor={3} saturation={0} fade speed={1} />
      </Canvas>
      <div className="absolute bottom-4 right-4 bg-deep-forest/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 text-white text-[10px] uppercase font-bold tracking-widest pointer-events-none">
        Drag untuk Memutar 3D
      </div>
    </div>
  );
}
