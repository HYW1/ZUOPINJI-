import * as THREE from 'three';
import { TypewriterColor } from '../../../types';
import { createPaperCanvasTexture } from '../../../utils/textureGenerator';

function createKeyLabelTexture(label: string, isRed = false): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 128, 128);

    // High contrast crisp vintage typewriter keycap label
    const fontSize = label.length > 1 ? 44 : 68;
    ctx.font = `900 ${fontSize}px "Courier New", Courier, Georgia, monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isRed ? '#FFFFFF' : '#111315';

    ctx.fillText(label, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

export class Typewriter3D {
  public group: THREE.Group;
  public paperMesh: THREE.Mesh;
  public paperTexture: THREE.CanvasTexture;
  private colorMap: Record<TypewriterColor, string> = {
    dusty_teal: '#4C7A8C', // Vintage teal blue matching reference image
    cream_ivory: '#E6DFD3',
    matte_black: '#2D3136',
    cherry_red: '#9E2A2B',
    sage_green: '#5E7063',
  };

  private bodyMaterial: THREE.MeshStandardMaterial;
  private keyGroup: THREE.Group;
  private carriageGroup: THREE.Group;
  private keysMap: Map<string, THREE.Group> = new Map();

  constructor(
    typewriterColor: TypewriterColor = 'dusty_teal',
    paperText: string = 'Design is thinking\nmade visual.'
  ) {
    this.group = new THREE.Group();
    this.group.name = 'typewriter';

    // Body Material - Smooth metallic satin vintage paint
    this.bodyMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.colorMap[typewriterColor]),
      roughness: 0.28,
      metalness: 0.22,
    });

    // Dark grey textured base trim material
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x22252a,
      roughness: 0.55,
      metalness: 0.25,
    });

    // Recessed dark keybed material
    const keybedMaterial = new THREE.MeshStandardMaterial({
      color: 0x121518,
      roughness: 0.85,
      metalness: 0.15,
    });

    // Chrome / Silver metal material for levers, rings & bars
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe6ecf2,
      roughness: 0.15,
      metalness: 0.92,
    });

    // Cream / Off-white key top material
    const keyTopMaterial = new THREE.MeshStandardMaterial({
      color: 0xfbf6ec,
      roughness: 0.32,
      metalness: 0.05,
    });

    // Accent Red Key Material
    const redKeyMaterial = new THREE.MeshStandardMaterial({
      color: 0xd32f2f,
      roughness: 0.28,
      metalness: 0.15,
    });

    // 1. TYPEWRITER BASE & CASTING (Beveled, Non-Clipping)
    // Lower Base Frame Plate with rounded corners
    const baseShape = new THREE.Shape();
    const bw = 2.35, bd = 2.22, br = 0.12;
    baseShape.moveTo(-bw/2 + br, -bd/2);
    baseShape.lineTo(bw/2 - br, -bd/2);
    baseShape.quadraticCurveTo(bw/2, -bd/2, bw/2, -bd/2 + br);
    baseShape.lineTo(bw/2, bd/2 - br);
    baseShape.quadraticCurveTo(bw/2, bd/2, bw/2 - br, bd/2);
    baseShape.lineTo(-bw/2 + br, bd/2);
    baseShape.quadraticCurveTo(-bw/2, bd/2, -bw/2, bd/2 - br);
    baseShape.lineTo(-bw/2, -bd/2 + br);
    baseShape.quadraticCurveTo(-bw/2, -bd/2, -bw/2 + br, -bd/2);

    const baseExtrudeSettings = {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };

    const baseGeo = new THREE.ExtrudeGeometry(baseShape, baseExtrudeSettings);
    baseGeo.rotateX(-Math.PI / 2); // Correct orientation: Z extrude becomes Y height!
    const baseMesh = new THREE.Mesh(baseGeo, baseMaterial);
    baseMesh.position.set(0, 0, 0.05);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    this.group.add(baseMesh);

    // Rear Main Housing (Stays strictly behind Z = -0.01 so keyboard is never blocked)
    const rearShape = new THREE.Shape();
    const rw = 2.20, rd = 0.82, rr = 0.10;
    rearShape.moveTo(-rw/2 + rr, -rd/2);
    rearShape.lineTo(rw/2 - rr, -rd/2);
    rearShape.quadraticCurveTo(rw/2, -rd/2, rw/2, -rd/2 + rr);
    rearShape.lineTo(rw/2, rd/2 - rr);
    rearShape.quadraticCurveTo(rw/2, rd/2, rw/2 - rr, rd/2);
    rearShape.lineTo(-rw/2 + rr, rd/2);
    rearShape.quadraticCurveTo(-rw/2, rd/2, -rw/2, rd/2 - rr);
    rearShape.lineTo(-rw/2, -rd/2 + rr);
    rearShape.quadraticCurveTo(-rw/2, -rd/2, -rw/2 + rr, -rd/2);

    const rearExtrudeSettings = {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const rearBodyGeo = new THREE.ExtrudeGeometry(rearShape, rearExtrudeSettings);
    rearBodyGeo.rotateX(-Math.PI / 2);
    const rearBodyMesh = new THREE.Mesh(rearBodyGeo, this.bodyMaterial);
    rearBodyMesh.position.set(0, 0.12, -0.42);
    rearBodyMesh.castShadow = true;
    rearBodyMesh.receiveShadow = true;
    this.group.add(rearBodyMesh);

    // Side Cheeks (Left and Right arms framing the keyboard bay)
    const cheekShape = new THREE.Shape();
    const cw = 0.22, cd = 1.15, cr = 0.05;
    cheekShape.moveTo(-cw/2 + cr, -cd/2);
    cheekShape.lineTo(cw/2 - cr, -cd/2);
    cheekShape.quadraticCurveTo(cw/2, -cd/2, cw/2, -cd/2 + cr);
    cheekShape.lineTo(cw/2, cd/2 - cr);
    cheekShape.quadraticCurveTo(cw/2, cd/2, cw/2 - cr, cd/2);
    cheekShape.lineTo(-cw/2 + cr, cd/2);
    cheekShape.quadraticCurveTo(-cw/2, cd/2, -cw/2, cd/2 - cr);
    cheekShape.lineTo(-cw/2, -cd/2 + cr);
    cheekShape.quadraticCurveTo(-cw/2, -cd/2, -cw/2 + cr, -cd/2);

    const cheekExtrudeSettings = {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };

    const leftCheekGeo = new THREE.ExtrudeGeometry(cheekShape, cheekExtrudeSettings);
    leftCheekGeo.rotateX(-Math.PI / 2);
    const leftCheek = new THREE.Mesh(leftCheekGeo, this.bodyMaterial);
    leftCheek.position.set(-1.00, 0.12, 0.25);
    leftCheek.castShadow = true;
    leftCheek.receiveShadow = true;
    this.group.add(leftCheek);

    const rightCheekGeo = new THREE.ExtrudeGeometry(cheekShape, cheekExtrudeSettings);
    rightCheekGeo.rotateX(-Math.PI / 2);
    const rightCheek = new THREE.Mesh(rightCheekGeo, this.bodyMaterial);
    rightCheek.position.set(1.00, 0.12, 0.25);
    rightCheek.castShadow = true;
    rightCheek.receiveShadow = true;
    this.group.add(rightCheek);

    // Front Bumper / Lip (Sitting in front under spacebar)
    const frontLipGeo = new THREE.BoxGeometry(1.78, 0.10, 0.16);
    const frontLipMesh = new THREE.Mesh(frontLipGeo, this.bodyMaterial);
    frontLipMesh.position.set(0, 0.17, 0.76);
    frontLipMesh.castShadow = true;
    frontLipMesh.receiveShadow = true;
    this.group.add(frontLipMesh);

    // Recessed Dark Keybed Floor Inside Keyboard Bay
    const keybedGeo = new THREE.BoxGeometry(1.78, 0.03, 0.70);
    const keybedMesh = new THREE.Mesh(keybedGeo, keybedMaterial);
    keybedMesh.position.set(0, 0.135, 0.32);
    keybedMesh.receiveShadow = true;
    this.group.add(keybedMesh);

    // "RetroWriter" Metallic Brand Badge Plate
    const badgeGeo = new THREE.BoxGeometry(0.50, 0.10, 0.02);
    const badgeMat = new THREE.MeshStandardMaterial({
      color: 0xd2c2a8,
      roughness: 0.25,
      metalness: 0.78,
    });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.position.set(0.48, 0.40, -0.01);
    this.group.add(badgeMesh);

    // 2. TYPEBAR BASKET (Metal hammers sloping down behind keyboard)
    const typebarGroup = new THREE.Group();
    typebarGroup.position.set(0, 0.32, -0.12);
    const numBars = 16;
    for (let i = 0; i < numBars; i++) {
      const angle = (i - (numBars - 1) / 2) * 0.08;
      const barGeo = new THREE.BoxGeometry(0.02, 0.025, 0.35);
      const barMesh = new THREE.Mesh(barGeo, chromeMaterial);
      barMesh.rotation.y = angle;
      barMesh.rotation.x = -0.28;
      barMesh.position.set(Math.sin(angle) * 0.32, 0.04, -Math.cos(angle) * 0.12);
      typebarGroup.add(barMesh);
    }
    this.group.add(typebarGroup);

    // 3. REWRITTEN INTERACTIVE KEYBOARD KEYS (4 Character Rows + Spacebar with Uniform Spacing)
    this.keyGroup = new THREE.Group();
    this.keyGroup.position.set(0, 0.18, 0.30);

    const keyRows = [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', 'RED']
    ];

    const keyRadius = 0.056;
    const keyCapHeight = 0.040;
    const keyGeo = new THREE.CylinderGeometry(keyRadius, keyRadius * 0.92, keyCapHeight, 24);
    const ringGeo = new THREE.CylinderGeometry(keyRadius * 1.05, keyRadius * 1.05, keyCapHeight * 0.5, 24);

    // Strictly uniform horizontal and row-to-row vertical spacing
    const xSpacing = 0.148;
    const zRowSpacing = 0.142; // Constant delta Z between consecutive rows
    const startZ = -0.25;

    keyRows.forEach((row, rowIndex) => {
      // Uniform Z step and gradual staircase Y height adjustment
      const zPos = startZ + rowIndex * zRowSpacing;
      const yPos = 0.15 - rowIndex * 0.036;
      const xOffset = (row.length - 1) * xSpacing * 0.5;

      row.forEach((char, colIndex) => {
        const xPos = colIndex * xSpacing - xOffset;
        const isRed = char === 'RED';
        const mat = isRed ? redKeyMaterial : keyTopMaterial;

        const singleKeyGroup = new THREE.Group();
        singleKeyGroup.position.set(xPos, yPos, zPos);
        singleKeyGroup.userData = { isKey: true, keyChar: isRed ? ' ' : char, originalY: yPos, targetY: yPos };

        // Keycap cylinder top
        const keyMesh = new THREE.Mesh(keyGeo, mat);
        keyMesh.castShadow = true;
        keyMesh.userData = { isKey: true, keyChar: isRed ? ' ' : char };
        singleKeyGroup.add(keyMesh);

        // Printed Character Label on Key Surface
        const displayChar = isRed ? '★' : char;
        const labelGeo = new THREE.PlaneGeometry(keyRadius * 1.65, keyRadius * 1.65);
        const labelTex = createKeyLabelTexture(displayChar, isRed);
        const labelMat = new THREE.MeshStandardMaterial({
          map: labelTex,
          transparent: true,
          roughness: 0.35,
          metalness: 0.0,
          polygonOffset: true,
          polygonOffsetFactor: -2,
        });
        const labelMesh = new THREE.Mesh(labelGeo, labelMat);
        labelMesh.rotation.x = -Math.PI / 2;
        labelMesh.position.y = keyCapHeight / 2 + 0.003;
        labelMesh.userData = { isKey: true, keyChar: isRed ? ' ' : char };
        singleKeyGroup.add(labelMesh);

        // Chrome ring trim
        const ringMesh = new THREE.Mesh(ringGeo, chromeMaterial);
        ringMesh.position.y = -0.01;
        ringMesh.userData = { isKey: true, keyChar: isRed ? ' ' : char };
        singleKeyGroup.add(ringMesh);

        // Key stem rod
        const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.12, 8);
        const stemMesh = new THREE.Mesh(stemGeo, chromeMaterial);
        stemMesh.position.set(0, -0.06, 0);
        stemMesh.userData = { isKey: true, keyChar: isRed ? ' ' : char };
        singleKeyGroup.add(stemMesh);

        this.keyGroup.add(singleKeyGroup);
        this.keysMap.set(isRed ? 'RED' : char, singleKeyGroup);
      });
    });

    // Spacebar - Positioned at row index 4 with exact uniform zRowSpacing delta
    const spacebarGroup = new THREE.Group();
    const spacebarZ = startZ + 4 * zRowSpacing; // Exactly 1 zRowSpacing step past row 3
    const spacebarY = 0.01;
    spacebarGroup.position.set(0, spacebarY, spacebarZ);
    spacebarGroup.userData = { isKey: true, keyChar: ' ', originalY: spacebarY, targetY: spacebarY };

    const spaceGeo = new THREE.BoxGeometry(1.02, 0.045, 0.10);
    const spaceMesh = new THREE.Mesh(spaceGeo, keyTopMaterial);
    spaceMesh.castShadow = true;
    spaceMesh.userData = { isKey: true, keyChar: ' ' };
    spacebarGroup.add(spaceMesh);

    // Spacebar label stamp
    const spaceLabelCanvas = document.createElement('canvas');
    spaceLabelCanvas.width = 256;
    spaceLabelCanvas.height = 64;
    const sCtx = spaceLabelCanvas.getContext('2d');
    if (sCtx) {
      sCtx.clearRect(0, 0, 256, 64);
      sCtx.font = 'bold 22px "Courier New", Courier, monospace';
      sCtx.textAlign = 'center';
      sCtx.textBaseline = 'middle';
      sCtx.fillStyle = '#666666';
      sCtx.fillText('— SPACE —', 128, 32);
    }
    const spaceTex = new THREE.CanvasTexture(spaceLabelCanvas);
    spaceTex.minFilter = THREE.LinearFilter;
    spaceTex.magFilter = THREE.LinearFilter;
    const spaceLabelMat = new THREE.MeshStandardMaterial({
      map: spaceTex,
      transparent: true,
      roughness: 0.4,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    });
    const spaceLabelMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.80, 0.08), spaceLabelMat);
    spaceLabelMesh.rotation.x = -Math.PI / 2;
    spaceLabelMesh.position.y = 0.045 / 2 + 0.003;
    spaceLabelMesh.userData = { isKey: true, keyChar: ' ' };
    spacebarGroup.add(spaceLabelMesh);

    const leftStem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.10, 8), chromeMaterial);
    leftStem.position.set(-0.35, -0.04, 0);
    leftStem.userData = { isKey: true, keyChar: ' ' };
    spacebarGroup.add(leftStem);

    const rightStem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.10, 8), chromeMaterial);
    rightStem.position.set(0.35, -0.04, 0);
    rightStem.userData = { isKey: true, keyChar: ' ' };
    spacebarGroup.add(rightStem);

    this.keyGroup.add(spacebarGroup);
    this.keysMap.set('SPACE', spacebarGroup);

    this.group.add(this.keyGroup);

    // 4. RIBBON SPOOLS
    const spoolGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.10, 24);
    const spoolMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });

    const leftSpool = new THREE.Mesh(spoolGeo, spoolMat);
    leftSpool.position.set(-0.68, 0.48, -0.22);
    this.group.add(leftSpool);

    const rightSpool = new THREE.Mesh(spoolGeo, spoolMat);
    rightSpool.position.set(0.68, 0.48, -0.22);
    this.group.add(rightSpool);

    // Metal ribbon guide
    const guideGeo = new THREE.BoxGeometry(0.18, 0.18, 0.04);
    const guideMesh = new THREE.Mesh(guideGeo, chromeMaterial);
    guideMesh.position.set(0, 0.50, -0.12);
    this.group.add(guideMesh);

    // 5. MOVING CARRIAGE ASSEMBLY
    this.carriageGroup = new THREE.Group();
    this.carriageGroup.position.set(0, 0.46, -0.42);

    // Black Platen Roller Cylinder
    const platenGeo = new THREE.CylinderGeometry(0.10, 0.10, 2.20, 32);
    const platenMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });
    const platenMesh = new THREE.Mesh(platenGeo, platenMat);
    platenMesh.rotation.z = Math.PI / 2;
    platenMesh.position.set(0, 0.12, 0);
    platenMesh.castShadow = true;
    this.carriageGroup.add(platenMesh);

    // Platen Knobs on left/right ends
    const knobGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.12, 24);
    const knobLeft = new THREE.Mesh(knobGeo, baseMaterial);
    knobLeft.rotation.z = Math.PI / 2;
    knobLeft.position.set(-1.18, 0.12, 0);
    this.carriageGroup.add(knobLeft);

    const knobRight = new THREE.Mesh(knobGeo, baseMaterial);
    knobRight.rotation.z = Math.PI / 2;
    knobRight.position.set(1.18, 0.12, 0);
    this.carriageGroup.add(knobRight);

    // Chrome Carriage Return Lever
    const leverGeo = new THREE.BoxGeometry(0.04, 0.40, 0.08);
    const leverMesh = new THREE.Mesh(leverGeo, chromeMaterial);
    leverMesh.position.set(-1.15, 0.28, 0.12);
    leverMesh.rotation.z = -0.3;
    leverMesh.rotation.x = -0.2;
    this.carriageGroup.add(leverMesh);

    // Paper Bail Bar holding paper against platen
    const bailGeo = new THREE.CylinderGeometry(0.018, 0.018, 2.05, 16);
    const bailMesh = new THREE.Mesh(bailGeo, chromeMaterial);
    bailMesh.rotation.z = Math.PI / 2;
    bailMesh.position.set(0, 0.20, 0.07);
    this.carriageGroup.add(bailMesh);

    // 6. TYPEWRITER PAPER SHEET (Perfectly inserted in platen mechanism)
    const paperWidth = 1.50;
    const paperHeight = 1.80;
    const paperGeo = new THREE.PlaneGeometry(paperWidth, paperHeight, 24, 24);

    // Curve bottom of paper smoothly around platen roller cylinder
    const pos = paperGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y < -0.2) {
        // Curve bottom around platen cylinder (radius 0.10)
        const wrapFactor = Math.sin((y + 0.2) * 2.8) * 0.12;
        pos.setZ(i, pos.getZ(i) + wrapFactor);
      }
    }
    paperGeo.computeVertexNormals();

    const { texture: pTex } = createPaperCanvasTexture(paperText);
    this.paperTexture = pTex;

    const paperMat = new THREE.MeshStandardMaterial({
      map: this.paperTexture,
      roughness: 0.85,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    this.paperMesh = new THREE.Mesh(paperGeo, paperMat);
    this.paperMesh.position.set(0, 0.48, -0.05);
    this.paperMesh.rotation.x = -0.22; // Leaning slightly backward
    this.paperMesh.castShadow = true;
    this.paperMesh.receiveShadow = true;
    this.carriageGroup.add(this.paperMesh);

    this.group.add(this.carriageGroup);

    // Sits directly on desk surface (Y = 0.76)
    this.group.position.set(0, 0.76, 0);
  }

  private currentHoverKeyChar: string | null = null;

  public setTypewriterColor(color: TypewriterColor) {
    this.bodyMaterial.color.setStyle(this.colorMap[color]);
  }

  public updatePaperText(text: string, showCursor = false) {
    const { texture } = createPaperCanvasTexture(text, 1024, 1024, showCursor);
    this.paperTexture.image = texture.image;
    this.paperTexture.needsUpdate = true;
  }

  // Set Hovered Key for Micro Displacement Feedback
  public setHoveredKey(keyChar: string | null) {
    if (this.currentHoverKeyChar === keyChar) return;
    this.currentHoverKeyChar = keyChar;

    this.keysMap.forEach((keyGroup, mapKey) => {
      const isMatch =
        keyChar !== null &&
        (keyGroup.userData.keyChar === keyChar ||
          mapKey === keyChar ||
          (mapKey === 'SPACE' && keyChar === ' ') ||
          (mapKey === 'RED' && keyChar === ' '));

      const origY = keyGroup.userData.originalY ?? keyGroup.position.y;
      if (keyGroup.userData.isPressing) return;

      if (isMatch) {
        // Micro depression down when hovered (Tactile feedback)
        keyGroup.userData.targetY = origY - 0.015;
      } else {
        keyGroup.userData.targetY = origY;
      }
    });
  }

  // Smooth Per-Frame Animation Update
  public update() {
    // Smoothly lerp key positions towards targetY for tactile spring feel
    this.keysMap.forEach((keyGroup) => {
      if (keyGroup.userData.targetY !== undefined && !keyGroup.userData.isPressing) {
        keyGroup.position.y = THREE.MathUtils.lerp(
          keyGroup.position.y,
          keyGroup.userData.targetY,
          0.25
        );
      }
    });
  }

  // Trigger Key Press Down Animation
  public animateKeyPress(char: string) {
    const keyGroup = this.keysMap.get(char.toUpperCase()) || this.keysMap.get('SPACE');
    if (keyGroup) {
      const originalY = keyGroup.userData.originalY ?? keyGroup.position.y;
      keyGroup.userData.isPressing = true;
      keyGroup.position.y = originalY - 0.038;
      setTimeout(() => {
        keyGroup.userData.isPressing = false;
        keyGroup.userData.targetY = this.currentHoverKeyChar === char ? originalY - 0.015 : originalY;
      }, 85);
    }

    // Carriage step jitter
    const carriageX = (Math.random() - 0.5) * 0.02;
    this.carriageGroup.position.x = carriageX;
    setTimeout(() => {
      this.carriageGroup.position.x = 0;
    }, 80);
  }
}
