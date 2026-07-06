'use client';
import { Float, PerspectiveCamera, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Noise, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Euler, Group, Vector3 } from "three";
import { usePlay } from "@/contexts/Play";
import { fadeOnBeforeCompile } from "@/utils/fadeMaterial";
import { Airplane } from "./Airplane";
import { Background } from "./Background";
import { Cloud, cloudMaterial } from "./Cloud";
import { Speed } from "./Speed";
import { MusikIcon, TarianIcon, GitarIcon, RumahAdatIcon } from "@/components/ui/PremiumIcons";

// Reduced from 1000 → 500: the path line is never viewed up-close and the
// camera curve is smooth enough that 500 extrusion steps are visually identical.
// This halves the triangle count of the flight-path mesh.
const LINE_NB_POINTS = 500;

const CURVE_DISTANCE = 150;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;

const JourneyStopCard = ({ stop, cameraGroup }: { stop: any; cameraGroup: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [shouldRenderIframe, setShouldRenderIframe] = useState(false);
  const iframeStateRef = useRef(false);

  useFrame(() => {
    if (!cardRef.current || !cameraGroup.current) return;

    const cameraPos = cameraGroup.current.position;
    const dz = cameraPos.z - stop.position.z;

    if (dz < -35) {
      if (iframeStateRef.current) {
        iframeStateRef.current = false;
        setShouldRenderIframe(false);
      }
      return;
    }

    const dist = cameraPos.distanceTo(stop.position);
    let opacity = 0;

    if (dz >= -15) {
      if (dist > 100) {
        opacity = 0;
      } else if (dist <= 45) {
        opacity = 1;
      } else {
        opacity = 1 - (dist - 45) / (100 - 45);
      }
    } else {
      const passDist = Math.abs(dz + 15);
      if (passDist < 20) {
        opacity = 1 - (passDist / 20);
      } else {
        opacity = 0;
      }
    }

    cardRef.current.style.opacity = String(opacity);

    if (opacity === 0) {
      cardRef.current.style.pointerEvents = 'none';
      cardRef.current.style.visibility = 'hidden';
    } else {
      cardRef.current.style.pointerEvents = 'all';
      cardRef.current.style.visibility = 'visible';
    }

    const isVisible = dist < 110 && opacity > 0;
    if (isVisible !== iframeStateRef.current) {
      iframeStateRef.current = isVisible;
      setShouldRenderIframe(isVisible);
    }
  });

  return (
    <Html position={stop.position} distanceFactor={15} center>
      <div 
        ref={cardRef}
        className="video-card-3d" 
        style={{ 
          borderTop: `4px solid ${stop.color}`, 
          opacity: 0, 
          transition: 'opacity 0.4s ease, visibility 0.4s, transform 0.4s ease',
          visibility: 'hidden',
          pointerEvents: 'none'
        }}
      >
        {/* Glowing accent line matching the stop color */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${stop.color}, transparent)`, borderRadius: '0' }} />
        
        <div className="video-card-3d-video">
          {shouldRenderIframe ? (
            <>
              <img
                src={stop.imageUrl}
                alt={stop.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, zIndex: 2 }} />
              {/* Gradient overlay at bottom for text legibility */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', zIndex: 3 }} />
            </>
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', border: `2px solid ${stop.color}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', letterSpacing: '0.1em' }}>MEMUAT</span>
            </div>
          )}
        </div>
        <div className="video-card-3d-info">
          <span className="video-card-3d-icon" style={{ color: stop.color }}>
            {stop.iconType === 'music' && <MusikIcon size={22} />}
            {stop.iconType === 'dance' && <TarianIcon size={22} />}
            {stop.iconType === 'guitar' && <GitarIcon size={22} />}
            {stop.iconType === 'home' && <RumahAdatIcon size={22} />}
          </span>
          <div style={{ flex: 1 }}>
            <p className="video-card-3d-region">{stop.region}</p>
            <h3 className="video-card-3d-title">{stop.title}</h3>
          </div>
          {/* Pulse indicator */}
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: stop.color, flexShrink: 0, animation: 'cardPulse 2s ease-in-out infinite' }} />
        </div>
      </div>
    </Html>
  );
};

// Pre-allocated scratch objects to avoid garbage collection thrashing in the 60fps render loop
const scratchVec1 = new THREE.Vector3();
const scratchVec2 = new THREE.Vector3();
const scratchVec3 = new THREE.Vector3();
const scratchVec4 = new THREE.Vector3();
const scratchEuler1 = new THREE.Euler();
const scratchQuaternion1 = new THREE.Quaternion();
const scratchGroup1 = new THREE.Group();
const upVector = new THREE.Vector3(0, 1, 0);

export const Experience = () => {
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
    ],
    []
  );

  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef<any>(null);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, []);

  const journeyStops = useMemo(
    () => [
      { id: 1, position: new THREE.Vector3(-12, 1.5, -110), imageUrl: '/images/diy.webp', title: 'Gamelan Jawa', region: 'D.I. Yogyakarta', color: '#6f35cc', iconType: 'music' },
      { id: 2, position: new THREE.Vector3(92, 1.5, -260), imageUrl: '/images/papua.webp', title: 'Rumah Honai', region: 'Papua', color: '#ffad30', iconType: 'home' },
      { id: 3, position: new THREE.Vector3(-72, 1.5, -410), imageUrl: '/images/kalimantan-barat.webp', title: 'Musik Sape', region: 'Kalimantan Barat', color: '#55ab8f', iconType: 'guitar' },
    ],
    []
  );

  const clouds = useMemo(
    () => [
      { position: new Vector3(-3.5, -3.2, -7) },
      { position: new Vector3(3.5, -4, -10) },
      { scale: new Vector3(4, 4, 4), position: new Vector3(-18, 0.2, -68), rotation: new Euler(-Math.PI / 5, Math.PI / 6, 0) },
      { scale: new Vector3(2.5, 2.5, 2.5), position: new Vector3(10, -1.2, -52) },
      { scale: new Vector3(4, 4, 4), position: new Vector3(curvePoints[1].x + 10, curvePoints[1].y - 4, curvePoints[1].z + 64) },
      { scale: new Vector3(3, 3, 3), position: new Vector3(curvePoints[1].x - 20, curvePoints[1].y + 4, curvePoints[1].z + 28) },
      { rotation: new Euler(0, Math.PI / 7, Math.PI / 5), scale: new Vector3(5, 5, 5), position: new Vector3(curvePoints[1].x - 13, curvePoints[1].y + 4, curvePoints[1].z - 62) },
      { scale: new Vector3(3, 3, 3), position: new Vector3(curvePoints[2].x + 6, curvePoints[2].y - 7, curvePoints[2].z + 50) },
      { scale: new Vector3(2, 2, 2), position: new Vector3(curvePoints[2].x - 2, curvePoints[2].y + 4, curvePoints[2].z - 26) },
      { scale: new Vector3(4, 4, 4), position: new Vector3(curvePoints[3].x + 3, curvePoints[3].y - 10, curvePoints[3].z + 50) },
      { scale: new Vector3(3, 3, 3), position: new Vector3(curvePoints[3].x - 10, curvePoints[3].y, curvePoints[3].z + 30) },
      { scale: new Vector3(4, 4, 4), position: new Vector3(curvePoints[4].x + 3, curvePoints[4].y - 10, curvePoints[4].z + 2) },
      { scale: new Vector3(3, 3, 3), position: new Vector3(curvePoints[4].x + 24, curvePoints[4].y - 6, curvePoints[4].z - 42) },
    ],
    []
  );

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);
    return shape;
  }, [curve]);

  const cameraGroup = useRef<any>(null);
  const cameraRail = useRef<any>(null);
  const camera = useRef<any>(null);
  const { play, end, setEnd } = usePlay();

  const autoProgress = useRef(0);
  const lastProgress = useRef(0);
  const autoTween = useRef<any>(null);

  const airplane = useRef<any>(null);
  const tl = useRef<any>(null);
  const backgroundColors = useRef({ colorA: "#F2F2F2", colorB: "#CFD8E1" });
  const planeInTl = useRef<any>(null);
  const planeOutTl = useRef<any>(null);
  const journeyProgress = useRef(0); // Track for dynamic sky updates

  const isLandscapeRef = useRef(typeof window !== 'undefined' ? window.innerWidth > window.innerHeight : true);

  const fireJourneyEnd = () => {
    window.dispatchEvent(new CustomEvent("nusaplay:journeyEnd"));
    setEnd(true);
    planeOutTl.current && planeOutTl.current.play();
  };

  useEffect(() => {
    const updateOrientation = () => {
      isLandscapeRef.current = window.innerWidth > window.innerHeight;
    };
    window.addEventListener('resize', updateOrientation, { passive: true });
    return () => window.removeEventListener('resize', updateOrientation);
  }, []);

  useLayoutEffect(() => {
    (window as any).gsap = gsap;
    tl.current = gsap.timeline();
    // Dynamic sky: warm sunrise → cool midday → golden sunset
    tl.current.to(backgroundColors.current, { duration: 1, colorA: "#f4c38a", colorB: "#e8a97a" }); // Sunrise amber
    tl.current.to(backgroundColors.current, { duration: 1, colorA: "#c5d8e8", colorB: "#a8c4d9" }); // Cool midday blue
    tl.current.to(backgroundColors.current, { duration: 1, colorA: "#f0d5a8", colorB: "#e8c090" }); // Golden afternoon
    tl.current.pause();

    planeInTl.current = gsap.timeline();
    planeInTl.current.pause();
    planeInTl.current.from(airplane.current.position, { duration: 1.5, z: 5, y: -2 });

    planeOutTl.current = gsap.timeline();
    planeOutTl.current.pause();
    planeOutTl.current.to(airplane.current.position, { duration: 2.0, z: -450, y: 15 }, 0);
    planeOutTl.current.to(cameraRail.current.position, { duration: 1.5, y: 12 }, 0);
    planeOutTl.current.to(airplane.current.position, { duration: 0.3, z: -1000 });
  }, []);

  useEffect(() => {
    if (!play) return;
    planeInTl.current.play();

    const timer = setTimeout(() => {
      autoTween.current = gsap.timeline({
        onComplete: () => { fireJourneyEnd(); },
      });

      autoTween.current.to(autoProgress, {
        current: 0.6,
        duration: 15,
        ease: "power1.inOut",
        onUpdate: () => {
          tl.current.seek(autoProgress.current * tl.current.duration());
          journeyProgress.current = autoProgress.current;
        },
      });

      autoTween.current.to(autoProgress, {
        current: 1.0,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: () => {
          tl.current.seek(autoProgress.current * tl.current.duration());
          journeyProgress.current = autoProgress.current;
        },
      });
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (autoTween.current) autoTween.current.kill();
    };
  }, [play]);

  useFrame((_state, delta) => {
    if (isLandscapeRef.current) {
      camera.current.fov = 30;
      camera.current.position.z = 5;
    } else {
      camera.current.fov = 80;
      camera.current.position.z = 2;
    }

    if (play && sceneOpacity.current < 1) {
      sceneOpacity.current = THREE.MathUtils.lerp(sceneOpacity.current, 1, delta * 4.0);
    }
    if (end && sceneOpacity.current > 0) {
      sceneOpacity.current = THREE.MathUtils.lerp(sceneOpacity.current, 0, delta * 4.0);
    }

    cloudMaterial.opacity = sceneOpacity.current;

    if (lineMaterialRef.current) {
      lineMaterialRef.current.opacity = sceneOpacity.current;
    }

    if (end) return;

    const scrollOffset = Math.min(Math.max(autoProgress.current, 0), 1);
    let lerpedOffset = THREE.MathUtils.lerp(lastProgress.current, scrollOffset, delta * 10);
    lerpedOffset = Math.min(lerpedOffset, 1);
    lerpedOffset = Math.max(lerpedOffset, 0);
    lastProgress.current = lerpedOffset;

    const curPoint = curve.getPoint(lerpedOffset);
    cameraGroup.current.position.copy(curPoint);

    const lookAtPoint = curve.getPoint(Math.min(lerpedOffset + CURVE_AHEAD_CAMERA, 1));
    const currentLookAt = cameraGroup.current.getWorldDirection(scratchVec1);
    
    scratchVec2.subVectors(curPoint, lookAtPoint).normalize();
    
    const lookAt = currentLookAt.lerp(scratchVec2, delta * 24);
    
    scratchVec3.copy(cameraGroup.current.position).add(lookAt);
    cameraGroup.current.lookAt(scratchVec3);

    const tangent = curve.getTangent(lerpedOffset + CURVE_AHEAD_AIRPLANE);
    
    scratchGroup1.position.copy(curPoint);
    scratchVec4.copy(scratchGroup1.position).add(scratchVec2);
    scratchGroup1.lookAt(scratchVec4);
    tangent.applyAxisAngle(upVector, -scratchGroup1.rotation.y);

    let angle = Math.atan2(-tangent.z, tangent.x);
    angle = -Math.PI / 2 + angle;
    let angleDegrees = (angle * 180) / Math.PI;
    angleDegrees *= 2.4;
    if (angleDegrees < 0) angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE);
    if (angleDegrees > 0) angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE);
    angle = (angleDegrees * Math.PI) / 180;

    scratchEuler1.set(airplane.current.rotation.x, airplane.current.rotation.y, angle);
    scratchQuaternion1.setFromEuler(scratchEuler1);
    airplane.current.quaternion.copy(scratchQuaternion1);

    cameraGroup.current.updateMatrixWorld(true);
  });

  return useMemo(
    () => (
      <>
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 3, 1]} intensity={1.5} />
        <group ref={cameraGroup}>
          <Speed />
          <Background backgroundColors={backgroundColors} />
          <group ref={cameraRail}>
            <PerspectiveCamera ref={camera} position={[0, 0, 5]} fov={30} makeDefault />
          </group>
          <group ref={airplane}>
            <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
              <Airplane rotation-y={Math.PI / 2} scale={[0.2, 0.2, 0.2]} position-y={0.1} />
            </Float>
          </group>
        </group>

        {play && !end && journeyStops.map((stop) => (
          <JourneyStopCard 
            key={stop.id}
            stop={stop}
            cameraGroup={cameraGroup}
          />
        ))}

        <group position-y={-2}>
          <mesh>
            <extrudeGeometry
              args={[shape, { steps: LINE_NB_POINTS, bevelEnabled: false, extrudePath: curve }]}
            />
            <meshStandardMaterial
              color={"white"}
              ref={lineMaterialRef}
              transparent
              envMapIntensity={2}
              onBeforeCompile={fadeOnBeforeCompile}
            />
          </mesh>
        </group>

        {clouds.map((cloud, index) => (
          <Cloud {...cloud} key={index} />
        ))}

        <EffectComposer>
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.7}
            luminanceSmoothing={0.9}
          />
          <Noise opacity={0.04} />
          <Vignette
            offset={0.45}
            darkness={0.6}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </>
    ),
    [play, end]
  );
};
