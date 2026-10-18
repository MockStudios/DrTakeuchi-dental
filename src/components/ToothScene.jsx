import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Sparkles,
  ContactShadows,
  Environment,
  Lightformer
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

// Real tooth model — "Tooth" by sugamo (CC BY 3.0) via poly.pizza.
const MODEL_URL = "/uploads/tooth.glb";

const ToothModel = ({ accent }) => {
  const gltf = useLoader(GLTFLoader, MODEL_URL);

  // The GLB is a hygiene set (toothpaste + molar + toothbrush); keep only the tooth.
  const TOOTH_MESH = "group338153130";

  const tooth = useMemo(() => {
    const enamel = new THREE.MeshPhysicalMaterial({
      color: "#f6f4ee",
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.14,
      metalness: 0,
      sheen: 1,
      sheenColor: new THREE.Color(accent),
      sheenRoughness: 0.45,
      envMapIntensity: 1.1
    });
    const clone = gltf.scene.clone(true);
    clone.updateWorldMatrix(true, true);
    let toothMesh = null;
    clone.traverse((o) => {
      if (!o.isMesh) return;
      if (o.name === TOOTH_MESH) {
        toothMesh = o;
        o.material = enamel;
        o.castShadow = true;
        o.receiveShadow = true;
      } else {
        o.visible = false; // hide toothbrush + toothpaste, keep tooth transforms intact
      }
    });
    // center the tooth (by its own world bounds) at the origin
    if (toothMesh) {
      const box = new THREE.Box3().setFromObject(toothMesh);
      const center = new THREE.Vector3();
      box.getCenter(center);
      clone.position.sub(center);
    }
    return clone;
  }, [gltf, accent]);

  return <primitive object={tooth} />;
};

const Spin = ({ children, scale }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <group ref={ref} scale={scale}>
      {children}
    </group>
  );
};

const ToothScene = ({ accent = "#2a9d8f", height = 420, scale = 5 }) => {
  return (
    <div style={{ width: "100%", height, cursor: "grab" }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[4, 6, 5]}
            intensity={1.7}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-5, 2, -4]} intensity={0.55} color={accent} />

          <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.6}>
            <Spin scale={scale}>
              <ToothModel accent={accent} />
            </Spin>
          </Float>

          <Sparkles
            count={60}
            scale={[7, 7, 7]}
            size={3}
            speed={0.35}
            opacity={0.7}
            color={accent}
          />

          <ContactShadows
            position={[0, -2.6, 0]}
            opacity={0.35}
            scale={12}
            blur={2.6}
            far={5}
          />

          {/* In-scene environment (no network fetch) for realistic enamel reflections */}
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 0]}>
              <Lightformer intensity={2} position={[0, 5, -9]} scale={[10, 10, 1]} />
              <Lightformer
                intensity={1.4}
                color={accent}
                position={[-5, 1, -1]}
                scale={[6, 6, 1]}
              />
              <Lightformer intensity={1} position={[5, 1, 1]} scale={[6, 6, 1]} />
            </group>
          </Environment>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.7}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ToothScene;
