import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DeskState, CameraPreset } from '../../types';
import { soundManager } from '../../utils/audioSystem';
import { Typewriter3D } from './models/Typewriter';
import { DeskAndWall3D } from './models/DeskAndWall';
import { DeskLamp3D } from './models/DeskLamp';
import { PencilCup3D } from './models/PencilCup';
import { Succulent3D } from './models/Succulent';
import { Books3D } from './models/Books';
import { WallFrames3D } from './models/WallFrames';

interface DeskSceneProps {
  state: DeskState;
  onUpdateState: (updater: (prev: DeskState) => DeskState) => void;
  onTypewriterCharTyped?: (char: string) => void;
  scrollOffset?: number;
}

// Camera Presets dictionary - Camera target raised to frame typewriter paper and typed text perfectly
const CAMERA_PRESETS: Record<CameraPreset, { pos: THREE.Vector3; lookAt: THREE.Vector3 }> = {
  overview: {
    pos: new THREE.Vector3(0.0, 1.62, 2.15), 
    lookAt: new THREE.Vector3(0.0, 1.25, -0.08),
  },
  typing: {
    pos: new THREE.Vector3(0.0, 1.65, 1.95), // Close-up framing both keyboard keys and typed paper
    lookAt: new THREE.Vector3(0.0, 1.30, -0.10),
  },
  cozy: {
    pos: new THREE.Vector3(-0.95, 1.65, 2.05), // Cozy left corner focusing on lamp, pencils, succulent
    lookAt: new THREE.Vector3(-0.8, 1.25, -0.05),
  },
  wall: {
    pos: new THREE.Vector3(0.3, 2.3, 2.8), // Straight-on wall frame view
    lookAt: new THREE.Vector3(0.3, 2.45, -1.9),
  },
};

export const DeskScene: React.FC<DeskSceneProps> = ({
  state,
  onUpdateState,
  onTypewriterCharTyped,
  scrollOffset = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Keep track of scroll offset in ref for frame-perfect 60fps render loop parallax
  const scrollOffsetRef = useRef(scrollOffset);
  useEffect(() => {
    scrollOffsetRef.current = scrollOffset;
  }, [scrollOffset]);

  // 3D Object references
  const typewriterRef = useRef<Typewriter3D | null>(null);
  const deskAndWallRef = useRef<DeskAndWall3D | null>(null);
  const lampRef = useRef<DeskLamp3D | null>(null);
  const pencilCupRef = useRef<PencilCup3D | null>(null);
  const succulentRef = useRef<Succulent3D | null>(null);
  const booksRef = useRef<Books3D | null>(null);
  const wallFramesRef = useRef<WallFrames3D | null>(null);

  // Lights & Target Lighting for Smooth Transitions & Wood Surface Scattering
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const windowFillLightRef = useRef<THREE.DirectionalLight | null>(null);
  const woodBouncePointLightRef = useRef<THREE.PointLight | null>(null);

  const targetAmbientColor = useRef<THREE.Color>(new THREE.Color(0xfff4e6));
  const targetAmbientIntensity = useRef<number>(0.78);
  const targetDirColor = useRef<THREE.Color>(new THREE.Color(0xffeedd));
  const targetDirIntensity = useRef<number>(1.1);
  const targetWindowColor = useRef<THREE.Color>(new THREE.Color(0x809cb8));
  const targetWindowIntensity = useRef<number>(0.45);
  const targetBounceColor = useRef<THREE.Color>(new THREE.Color(0xffe2c0));
  const targetBounceIntensity = useRef<number>(0.85);
  const targetBgColor = useRef<THREE.Color>(new THREE.Color(0x23272d));

  // Camera Target Animation
  const INITIAL_PRESET = CAMERA_PRESETS[state.activeCameraPreset] || CAMERA_PRESETS.overview;
  const targetCamPos = useRef<THREE.Vector3>(INITIAL_PRESET.pos.clone());
  const targetLookAt = useRef<THREE.Vector3>(INITIAL_PRESET.lookAt.clone());

  // 1. INITIALIZE THREE.JS SCENE
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x23272d); // Warm dark blue-gray studio background
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.copy(CAMERA_PRESETS[state.activeCameraPreset].pos);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05; // Keep camera above table level
    controls.minDistance = 1.5;
    controls.maxDistance = 8.5;
    controls.target.copy(CAMERA_PRESETS[state.activeCameraPreset].lookAt);
    controlsRef.current = controls;

    // 2. LIGHTS SETUP
    // Soft Warm Ambient Light for Japanese Raw Wood Diffuse Atmosphere
    const ambientLight = new THREE.AmbientLight(0xfff4e6, 0.78);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // Main Directional Light for rich soft shadows
    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.1);
    dirLight.position.set(3.5, 6, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = 0.0001;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Soft Window Fill Light from left
    const windowLight = new THREE.DirectionalLight(0x809cb8, 0.45);
    windowLight.position.set(-5, 4, 3);
    scene.add(windowLight);
    windowFillLightRef.current = windowLight;

    // Point Light with Physical Decay (decay = 2.0) for Japandi Raw Wood Surface Scattering
    // Simulates soft ambient light reflection and attenuation on rough wood desktop and fabrics
    const woodBouncePointLight = new THREE.PointLight(0xffe2c0, 0.85, 7.5, 2.0);
    woodBouncePointLight.position.set(0, 2.2, 0.2);
    scene.add(woodBouncePointLight);
    woodBouncePointLightRef.current = woodBouncePointLight;

    // 3. INSTANTIATE 3D MODELS
    const deskAndWall = new DeskAndWall3D(state.woodStyle);
    scene.add(deskAndWall.group);
    deskAndWallRef.current = deskAndWall;

    const typewriter = new Typewriter3D(state.typewriterColor, state.paperText);
    scene.add(typewriter.group);
    typewriterRef.current = typewriter;

    const lamp = new DeskLamp3D();
    scene.add(lamp.group);
    lampRef.current = lamp;

    const pencilCup = new PencilCup3D();
    scene.add(pencilCup.group);
    pencilCupRef.current = pencilCup;

    const succulent = new Succulent3D();
    scene.add(succulent.group);
    succulentRef.current = succulent;

    const books = new Books3D();
    scene.add(books.group);
    booksRef.current = books;

    const wallFrames = new WallFrames3D(state.wallArtStyle);
    scene.add(wallFrames.group);
    wallFramesRef.current = wallFrames;

    // 4. ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera transition with scroll parallax focusing onto paper
      if (cameraRef.current && controlsRef.current) {
        const scrollFactor = Math.min(Math.max((scrollOffsetRef.current || 0) / 450, 0), 1);
        const parallaxPos = targetCamPos.current.clone();
        parallaxPos.y += scrollFactor * 0.18; // Move camera higher as user scrolls down
        parallaxPos.z -= scrollFactor * 0.32; // Move camera closer to typewriter paper

        const parallaxLookAt = targetLookAt.current.clone();
        parallaxLookAt.y += scrollFactor * 0.22; // LookAt shifts directly onto typed paper

        cameraRef.current.position.lerp(parallaxPos, 0.08);
        controlsRef.current.target.lerp(parallaxLookAt, 0.08);
        controlsRef.current.update();
      }

      // Gentle subtle breathing movement on plant leaves (Disabled rotation to keep succulent stable)
      // Succulent is fixed on desk surface without continuous rotation

      // Smooth lighting mode lerp transitions
      const lerpSpeed = 0.04;
      if (ambientLightRef.current) {
        ambientLightRef.current.color.lerp(targetAmbientColor.current, lerpSpeed);
        ambientLightRef.current.intensity = THREE.MathUtils.lerp(
          ambientLightRef.current.intensity,
          targetAmbientIntensity.current,
          lerpSpeed
        );
      }
      if (dirLightRef.current) {
        dirLightRef.current.color.lerp(targetDirColor.current, lerpSpeed);
        dirLightRef.current.intensity = THREE.MathUtils.lerp(
          dirLightRef.current.intensity,
          targetDirIntensity.current,
          lerpSpeed
        );
      }
      if (windowFillLightRef.current) {
        windowFillLightRef.current.color.lerp(targetWindowColor.current, lerpSpeed);
        windowFillLightRef.current.intensity = THREE.MathUtils.lerp(
          windowFillLightRef.current.intensity,
          targetWindowIntensity.current,
          lerpSpeed
        );
      }
      if (woodBouncePointLightRef.current) {
        woodBouncePointLightRef.current.color.lerp(targetBounceColor.current, lerpSpeed);
        woodBouncePointLightRef.current.intensity = THREE.MathUtils.lerp(
          woodBouncePointLightRef.current.intensity,
          targetBounceIntensity.current,
          lerpSpeed
        );
      }

      // Smooth typewriter keys tactile hover lerp animation
      if (typewriterRef.current) {
        typewriterRef.current.update();
      }

      if (sceneRef.current && sceneRef.current.background instanceof THREE.Color) {
        sceneRef.current.background.lerp(targetBgColor.current, lerpSpeed);
      }

      // Render
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Resize Observer & Aspect Ratio Adaptive FOV
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      const aspect = w / h;

      cameraRef.current.aspect = aspect;

      if (aspect < 1.0) {
        // Mobile portrait aspect ratio: dynamically adjust FOV so horizontal desk view is not cut off
        const desktopHFov = 2 * Math.atan(Math.tan((38 * Math.PI / 180) / 2) * (16 / 9));
        let mobileFov = (2 * Math.atan(Math.tan(desktopHFov / 2) / aspect)) * (180 / Math.PI);
        cameraRef.current.fov = Math.min(Math.max(mobileFov, 38), 76);
      } else {
        cameraRef.current.fov = 38;
      }

      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    handleResize(); // Initial sizing check

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
    };
  }, []);

  // 5. UPDATE LIGHTING MODE TARGETS & LAMP STATE
  useEffect(() => {
    if (state.lightingMode === 'golden') {
      targetAmbientColor.current.setStyle('#ffe8d6');
      targetAmbientIntensity.current = 0.85;
      targetDirColor.current.setStyle('#ffd1a4');
      targetDirIntensity.current = 1.3;
      targetWindowColor.current.setStyle('#ffa654');
      targetWindowIntensity.current = 0.55;
      targetBounceColor.current.setStyle('#ffdba8');
      targetBounceIntensity.current = 1.10;
      targetBgColor.current.setStyle('#2a231d');
    } else if (state.lightingMode === 'evening') {
      targetAmbientColor.current.setStyle('#524338'); // Cozy warm evening tone
      targetAmbientIntensity.current = 0.65;
      targetDirColor.current.setStyle('#8c725c');
      targetDirIntensity.current = 0.8;
      targetWindowColor.current.setStyle('#688098');
      targetWindowIntensity.current = 0.4;
      targetBounceColor.current.setStyle('#8c6a4f');
      targetBounceIntensity.current = 0.70;
      targetBgColor.current.setStyle('#23272d');
    } else if (state.lightingMode === 'night') {
      targetAmbientColor.current.setStyle('#303a48');
      targetAmbientIntensity.current = 0.45;
      targetDirColor.current.setStyle('#485b73');
      targetDirIntensity.current = 0.5;
      targetWindowColor.current.setStyle('#384c66');
      targetWindowIntensity.current = 0.3;
      targetBounceColor.current.setStyle('#3e4b5d');
      targetBounceIntensity.current = 0.40;
      targetBgColor.current.setStyle('#15181e');
    } else if (state.lightingMode === 'rainy') {
      targetAmbientColor.current.setStyle('#3d4b58');
      targetAmbientIntensity.current = 0.55;
      targetDirColor.current.setStyle('#5d7285');
      targetDirIntensity.current = 0.7;
      targetWindowColor.current.setStyle('#6d88a2');
      targetWindowIntensity.current = 0.6;
      targetBounceColor.current.setStyle('#526375');
      targetBounceIntensity.current = 0.50;
      targetBgColor.current.setStyle('#1d232a');
    }

    lampRef.current?.setLampState(state.lampOn, state.lampIntensity, state.lampColor);
  }, [state.lightingMode, state.lampOn, state.lampIntensity, state.lampColor]);

  // 6. UPDATE MATERIAL STYLES WHEN STATE CHANGES
  useEffect(() => {
    if (deskAndWallRef.current) deskAndWallRef.current.updateWoodStyle(state.woodStyle);
  }, [state.woodStyle]);

  useEffect(() => {
    if (typewriterRef.current) typewriterRef.current.setTypewriterColor(state.typewriterColor);
  }, [state.typewriterColor]);

  useEffect(() => {
    if (typewriterRef.current) typewriterRef.current.updatePaperText(state.paperText);
  }, [state.paperText]);

  useEffect(() => {
    if (wallFramesRef.current) wallFramesRef.current.updateArtStyle(state.wallArtStyle);
  }, [state.wallArtStyle]);

  // 7. CAMERA PRESET TRANSITION
  useEffect(() => {
    const preset = CAMERA_PRESETS[state.activeCameraPreset];
    if (preset && containerRef.current) {
      const aspect = containerRef.current.clientWidth / (containerRef.current.clientHeight || 1);
      const pos = preset.pos.clone();
      if (aspect < 1.0) {
        // Mobile portrait screen framing adjustments
        if (state.activeCameraPreset === 'overview') {
          pos.set(0.0, 2.1, 3.4);
        } else if (state.activeCameraPreset === 'typing') {
          pos.set(0.0, 1.62, 2.18); // Pulled back slightly so all key rows (1..0, Q..P, A..;, Z..RED) fit horizontally
        } else if (state.activeCameraPreset === 'cozy') {
          pos.set(-0.95, 1.70, 2.40);
        } else if (state.activeCameraPreset === 'wall') {
          pos.set(0.3, 2.40, 3.20);
        }
      }
      targetCamPos.current.copy(pos);
      targetLookAt.current.copy(preset.lookAt);
    }
  }, [state.activeCameraPreset]);

  // 8. RAYCASTING INTERACTION HANDLER (Clicking Objects in Scene)
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!sceneRef.current || !cameraRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const intersects = raycaster.intersectObjects(sceneRef.current.children, true);

    if (intersects.length > 0) {
      // First check if an individual 3D typewriter key was clicked
      let keyHitObj: THREE.Object3D | null = intersects[0].object;
      let pressedKeyChar: string | null = null;
      while (keyHitObj) {
        if (keyHitObj.userData?.isKey && keyHitObj.userData?.keyChar !== undefined) {
          pressedKeyChar = keyHitObj.userData.keyChar;
          break;
        }
        keyHitObj = keyHitObj.parent;
      }

      if (pressedKeyChar !== null) {
        // Individual 3D Key Clicked!
        soundManager.playTypewriterKey();
        typewriterRef.current?.animateKeyPress(pressedKeyChar);
        onUpdateState((prev) => ({
          ...prev,
          paperText: prev.paperText + pressedKeyChar,
        }));
        return;
      }

      let currObj: THREE.Object3D | null = intersects[0].object;

      while (currObj) {
        // Lamp clicked -> toggle lamp
        if (currObj.name === 'desk_lamp') {
          soundManager.playLampSwitch();
          onUpdateState((prev) => ({ ...prev, lampOn: !prev.lampOn }));
          break;
        }

        // Typewriter clicked -> focus typing preset view & keyboard
        if (currObj.name === 'typewriter') {
          soundManager.playTypewriterKey();
          break;
        }

        // Pencil Cup clicked -> wobble pencils
        if (currObj.name === 'pencil_cup') {
          soundManager.playPencilRattle();
          pencilCupRef.current?.wobble();
          break;
        }

        // Succulent clicked -> bounce leaves & sound
        if (currObj.name === 'succulent') {
          soundManager.playWaterPlop();
          succulentRef.current?.bounce();
          break;
        }

        // Books clicked -> flip sound
        if (currObj.name === 'books_stack') {
          soundManager.playPageFlip();
          break;
        }

        // Wall Frame clicked -> focus wall preset
        if (currObj.name === 'wall_frames') {
          soundManager.playPageFlip();
          break;
        }

        currObj = currObj.parent;
      }
    }
  };

  // Hover Handler for Key Displacement and Cursor State Feedback
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!sceneRef.current || !cameraRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const intersects = raycaster.intersectObjects(sceneRef.current.children, true);

    let hoveredKeyChar: string | null = null;
    let isInteractiveHover = false;

    if (intersects.length > 0) {
      let hitObj: THREE.Object3D | null = intersects[0].object;
      while (hitObj) {
        if (hitObj.userData?.isKey && hitObj.userData?.keyChar !== undefined) {
          hoveredKeyChar = hitObj.userData.keyChar;
          isInteractiveHover = true;
          break;
        }
        if (
          hitObj.name === 'desk_lamp' ||
          hitObj.name === 'typewriter' ||
          hitObj.name === 'pencil_cup' ||
          hitObj.name === 'succulent' ||
          hitObj.name === 'books_stack' ||
          hitObj.name === 'wall_frames'
        ) {
          isInteractiveHover = true;
        }
        hitObj = hitObj.parent;
      }
    }

    typewriterRef.current?.setHoveredKey(hoveredKeyChar);

    if (containerRef.current) {
      containerRef.current.style.cursor = isInteractiveHover ? 'pointer' : 'grab';
    }
  };

  const handlePointerLeave = () => {
    typewriterRef.current?.setHoveredKey(null);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  // 9. LISTEN TO GLOBAL KEYBOARD INPUT FOR TYPEWRITER TYPING
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore typing if typing inside an HTML input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === 'Backspace') {
        soundManager.playTypewriterKey(1);
        typewriterRef.current?.animateKeyPress('RED');
        onUpdateState((prev) => ({
          ...prev,
          paperText: prev.paperText.slice(0, -1),
          keystrokeCount: prev.keystrokeCount + 1,
        }));
      } else if (e.key === 'Enter') {
        soundManager.playCarriageBell();
        typewriterRef.current?.animateKeyPress('RED');
        onUpdateState((prev) => ({
          ...prev,
          paperText: prev.paperText + '\n',
          keystrokeCount: prev.keystrokeCount + 1,
        }));
      } else if (e.key === ' ') {
        soundManager.playSpacebar();
        typewriterRef.current?.animateKeyPress('SPACE');
        onUpdateState((prev) => ({
          ...prev,
          paperText: prev.paperText + ' ',
          keystrokeCount: prev.keystrokeCount + 1,
        }));
      } else if (e.key.length === 1) {
        soundManager.playTypewriterKey(e.key.charCodeAt(0));
        typewriterRef.current?.animateKeyPress(e.key);
        onUpdateState((prev) => ({
          ...prev,
          paperText: prev.paperText + e.key,
          keystrokeCount: prev.keystrokeCount + 1,
        }));
        if (onTypewriterCharTyped) onTypewriterCharTyped(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUpdateState, onTypewriterCharTyped]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden"
    />
  );
};
