import * as THREE from 'three';

export class PencilCup3D {
  public group: THREE.Group;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'pencil_cup';

    // Matte Clay / Grey Ceramic Pot Material (Matching image)
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0x8c8880, // Matte grey clay ceramic pot
      roughness: 0.75,
      metalness: 0.05,
    });

    // 1. Ceramic Holder Cylinder
    const cupGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.55, 32, 1, true);
    const cupMesh = new THREE.Mesh(cupGeo, ceramicMat);
    cupMesh.position.set(0, 0.275, 0);
    cupMesh.castShadow = true;
    cupMesh.receiveShadow = true;
    this.group.add(cupMesh);

    // Cup Base
    const baseGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.03, 32);
    const baseMesh = new THREE.Mesh(baseGeo, ceramicMat);
    baseMesh.position.set(0, 0.015, 0);
    this.group.add(baseMesh);

    // Inside Cup Bottom
    const innerBottomMesh = new THREE.Mesh(baseGeo, ceramicMat);
    innerBottomMesh.position.set(0, 0.08, 0);
    this.group.add(innerBottomMesh);

    // 2. COLORFUL PENCILS & RULER (Yellow, Blue, Natural Wood, Graphite)
    const pencilColors = [
      0xf39c12, // Classic Yellow Pencil (Matching image)
      0x2980b9, // Ocean Blue Pencil (Matching image)
      0xd35400, // Terra Cotta Pencil
      0x7f8c8d, // Graphite Pencil
      0xe67e22, // Orange Wood Pencil
    ];

    pencilColors.forEach((color, i) => {
      const pencilGroup = new THREE.Group();

      // Hexagonal / Rounded Pencil Shaft
      const pencilGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.7, 6);
      const pencilMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.4,
        metalness: 0.1,
      });
      const pencilMesh = new THREE.Mesh(pencilGeo, pencilMat);
      pencilMesh.position.set(0, 0.35, 0);
      pencilMesh.castShadow = true;
      pencilGroup.add(pencilMesh);

      // Sharpened Cone Tip (Wood + Graphite)
      const woodTipGeo = new THREE.ConeGeometry(0.018, 0.07, 12);
      const woodTipMat = new THREE.MeshStandardMaterial({ color: 0xdfc19c, roughness: 0.7 });
      const woodTipMesh = new THREE.Mesh(woodTipGeo, woodTipMat);
      woodTipMesh.position.set(0, 0.725, 0);
      pencilGroup.add(woodTipMesh);

      const leadTipGeo = new THREE.ConeGeometry(0.008, 0.025, 8);
      const leadTipMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5 });
      const leadTipMesh = new THREE.Mesh(leadTipGeo, leadTipMat);
      leadTipMesh.position.set(0, 0.75, 0);
      pencilGroup.add(leadTipMesh);

      // Pink Eraser Top with Brass Ferrule
      const ferruleGeo = new THREE.CylinderGeometry(0.019, 0.019, 0.04, 12);
      const ferruleMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.8 });
      const ferruleMesh = new THREE.Mesh(ferruleGeo, ferruleMat);
      ferruleMesh.position.set(0, 0.02, 0);
      pencilGroup.add(ferruleMesh);

      const eraserGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.04, 12);
      const eraserMat = new THREE.MeshStandardMaterial({ color: 0xe8a7a1, roughness: 0.8 });
      const eraserMesh = new THREE.Mesh(eraserGeo, eraserMat);
      eraserMesh.position.set(0, -0.02, 0);
      pencilGroup.add(eraserMesh);

      // Angle placement inside cup naturally
      const angle = (i / pencilColors.length) * Math.PI * 2;
      const radius = 0.08;
      pencilGroup.position.set(Math.cos(angle) * radius, 0.12, Math.sin(angle) * radius);
      pencilGroup.rotation.z = (Math.random() - 0.5) * 0.25;
      pencilGroup.rotation.x = (Math.random() - 0.5) * 0.25;

      this.group.add(pencilGroup);
    });

    // Wooden Ruler sticking out
    const rulerGeo = new THREE.BoxGeometry(0.06, 0.75, 0.008);
    const rulerMat = new THREE.MeshStandardMaterial({ color: 0xd8be9b, roughness: 0.6 });
    const rulerMesh = new THREE.Mesh(rulerGeo, rulerMat);
    rulerMesh.position.set(0.05, 0.42, -0.05);
    rulerMesh.rotation.z = 0.2;
    rulerMesh.rotation.y = 0.4;
    rulerMesh.castShadow = true;
    this.group.add(rulerMesh);

    // Position on desk to the left of the typewriter with clear margin
    this.group.position.set(-1.45, 0.76, -0.15);
  }

  // Wobble animation when clicked
  public wobble() {
    const originalZ = this.group.rotation.z;
    this.group.rotation.z = 0.15;
    setTimeout(() => {
      this.group.rotation.z = -0.1;
      setTimeout(() => {
        this.group.rotation.z = 0;
      }, 100);
    }, 100);
  }
}
