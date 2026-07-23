import * as THREE from 'three';

export class Succulent3D {
  public group: THREE.Group;
  public leavesGroup: THREE.Group;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'succulent';

    // 1. BEVELED CERAMIC POT (Off-White Warm Cream Glazed Pottery)
    const potMat = new THREE.MeshStandardMaterial({
      color: 0xefe8de, // Off-white warm cream ceramic matching aesthetic desktop
      roughness: 0.25,
      metalness: 0.05,
    });

    // Main Tapered Pot Body
    const potGeo = new THREE.CylinderGeometry(0.22, 0.16, 0.32, 32);
    const potMesh = new THREE.Mesh(potGeo, potMat);
    potMesh.position.set(0, 0.16, 0);
    potMesh.castShadow = true;
    potMesh.receiveShadow = true;
    this.group.add(potMesh);

    // Rounded Ceramic Top Rim Lip (Smooth Bevel - 倒圆角)
    const topRimGeo = new THREE.TorusGeometry(0.22, 0.024, 16, 32);
    const topRimMesh = new THREE.Mesh(topRimGeo, potMat);
    topRimMesh.rotation.x = Math.PI / 2;
    topRimMesh.position.set(0, 0.32, 0);
    topRimMesh.castShadow = true;
    this.group.add(topRimMesh);

    // Rounded Ceramic Base Ring (Smooth Bevel - 倒圆角)
    const baseRingGeo = new THREE.TorusGeometry(0.16, 0.018, 16, 32);
    const baseRingMesh = new THREE.Mesh(baseRingGeo, potMat);
    baseRingMesh.rotation.x = Math.PI / 2;
    baseRingMesh.position.set(0, 0.018, 0);
    this.group.add(baseRingMesh);

    // 2. SOIL & RIVER PEBBLE STONES
    const soilGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.04, 32);
    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x2e2118, // Rich dark organic soil
      roughness: 0.95,
    });
    const soilMesh = new THREE.Mesh(soilGeo, soilMat);
    soilMesh.position.set(0, 0.30, 0);
    this.group.add(soilMesh);

    // Decorative Pumice / River Pebble Stones around succulent base
    const pebbleMat1 = new THREE.MeshStandardMaterial({ color: 0xd8cebe, roughness: 0.7 });
    const pebbleMat2 = new THREE.MeshStandardMaterial({ color: 0x7d7263, roughness: 0.8 });
    const stonePositions = [
      { x: -0.12, z: 0.10, s: 0.025, mat: pebbleMat1 },
      { x: 0.14, z: -0.08, s: 0.030, mat: pebbleMat2 },
      { x: -0.08, z: -0.13, s: 0.022, mat: pebbleMat1 },
      { x: 0.11, z: 0.11, s: 0.028, mat: pebbleMat2 },
      { x: 0.02, z: -0.15, s: 0.020, mat: pebbleMat1 },
    ];

    stonePositions.forEach((st) => {
      const pebbleGeo = new THREE.DodecahedronGeometry(st.s, 1);
      const pebbleMesh = new THREE.Mesh(pebbleGeo, st.mat);
      pebbleMesh.position.set(st.x, 0.32, st.z);
      pebbleMesh.rotation.set(Math.random(), Math.random(), Math.random());
      pebbleMesh.scale.set(1.2, 0.6, 1.0); // Flattened stone
      this.group.add(pebbleMesh);
    });

    // 3. PLUMP ROSSETTE SUCCULENT LEAVES (Smooth Fleshy Geometry with Bevels)
    this.leavesGroup = new THREE.Group();
    this.leavesGroup.position.set(0, 0.32, 0);

    // Leaf Materials
    const outerLeafMat = new THREE.MeshStandardMaterial({
      color: 0x4f7d54, // Deep jade green
      roughness: 0.38,
      metalness: 0.02,
    });

    const midLeafMat = new THREE.MeshStandardMaterial({
      color: 0x629968, // Vibrant jade green
      roughness: 0.35,
      metalness: 0.02,
    });

    const innerLeafMat = new THREE.MeshStandardMaterial({
      color: 0x82b888, // Tender light green center
      roughness: 0.32,
    });

    const tipBlushMat = new THREE.MeshStandardMaterial({
      color: 0xd67280, // Soft coral-pink blushed leaf tips
      roughness: 0.45,
    });

    // Helper function to create 1 plump, smooth succulent leaf (100% rounded curves)
    const createPlumpLeaf = (width: number, height: number, length: number, mat: THREE.MeshStandardMaterial) => {
      const leafNode = new THREE.Group();

      // Plump Leaf Body using scaled smooth sphere (gives smooth rounded edges & organic taper)
      const bodyGeo = new THREE.SphereGeometry(1, 24, 24);
      const bodyMesh = new THREE.Mesh(bodyGeo, mat);
      bodyMesh.scale.set(width, height, length);
      bodyMesh.position.set(0, height * 0.5, length * 0.5);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      leafNode.add(bodyMesh);

      // Blushed Pink Leaf Tip (Small rounded cap at tip of leaf)
      const tipGeo = new THREE.SphereGeometry(width * 0.45, 16, 16);
      const tipMesh = new THREE.Mesh(tipGeo, tipBlushMat);
      tipMesh.position.set(0, height * 0.5, length * 0.95);
      tipMesh.scale.set(1.0, 0.8, 1.2);
      leafNode.add(tipMesh);

      return leafNode;
    };

    // Concentric Rosette Tiers (Echeveria Jade Rose)
    const tiers = [
      // Base Tier (Large outer fanning leaves)
      { count: 10, width: 0.075, height: 0.040, len: 0.19, angleX: 0.32, mat: outerLeafMat, yOffset: 0.01 },
      // Tier 2 (Medium leaves)
      { count: 8, width: 0.065, height: 0.038, len: 0.16, angleX: 0.48, mat: midLeafMat, yOffset: 0.03 },
      // Tier 3 (Inner upright leaves)
      { count: 6, width: 0.052, height: 0.035, len: 0.12, angleX: 0.68, mat: innerLeafMat, yOffset: 0.05 },
      // Center Bud (Tight vertical young leaves)
      { count: 4, width: 0.038, height: 0.030, len: 0.08, angleX: 0.95, mat: innerLeafMat, yOffset: 0.07 },
    ];

    tiers.forEach((tier, tierIdx) => {
      const step = (Math.PI * 2) / tier.count;
      const rotOffset = tierIdx * 0.35; // Spiraling golden ratio shift

      for (let i = 0; i < tier.count; i++) {
        const leafAngle = i * step + rotOffset;

        const leafPivot = new THREE.Group();
        leafPivot.position.set(0, tier.yOffset, 0);
        leafPivot.rotation.y = leafAngle;

        const leaf = createPlumpLeaf(tier.width, tier.height, tier.len, tier.mat);
        leaf.rotation.x = tier.angleX; // Tilt leaf outward

        leafPivot.add(leaf);
        this.leavesGroup.add(leafPivot);
      }
    });

    // Add 1 Cute Mini "Pup" Rosette Offshoot at base for lush realism
    const pupGroup = new THREE.Group();
    pupGroup.position.set(-0.11, 0.02, 0.09);
    pupGroup.scale.set(0.55, 0.55, 0.55);

    const pupCount = 6;
    for (let i = 0; i < pupCount; i++) {
      const angle = (i * Math.PI * 2) / pupCount;
      const pPivot = new THREE.Group();
      pPivot.rotation.y = angle;
      const pLeaf = createPlumpLeaf(0.05, 0.03, 0.11, midLeafMat);
      pLeaf.rotation.x = 0.5;
      pPivot.add(pLeaf);
      pupGroup.add(pPivot);
    }
    this.leavesGroup.add(pupGroup);

    this.group.add(this.leavesGroup);

    // Position on desk to the left of the typewriter with clear margins
    this.group.position.set(-1.35, 0.76, 0.40);
  }

  // Gentle bounce interaction when clicked
  public bounce() {
    const origY = this.leavesGroup.position.y;
    this.leavesGroup.position.y = origY + 0.05;
    setTimeout(() => {
      this.leavesGroup.position.y = origY;
    }, 150);
  }
}
