import * as THREE from 'three';
import { DeskWoodStyle } from '../../../types';
import { createWoodTexture } from '../../../utils/textureGenerator';

export class DeskAndWall3D {
  public group: THREE.Group;
  public deskMesh: THREE.Mesh;
  private deskMaterial: THREE.MeshStandardMaterial;

  constructor(woodStyle: DeskWoodStyle = 'natural_oak') {
    this.group = new THREE.Group();
    this.group.name = 'desk_and_wall';

    // Desk Wood Texture
    const woodTex = createWoodTexture(woodStyle);

    this.deskMaterial = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.45,
      metalness: 0.05,
    });

    // 1. DESK TABLETOP (Japanese Muji style chamfered solid wood top)
    const deskWidth = 7.5;
    const deskDepth = 4.2;
    const deskThickness = 0.28;

    const deskGeo = new THREE.BoxGeometry(deskWidth, deskThickness, deskDepth);
    this.deskMesh = new THREE.Mesh(deskGeo, this.deskMaterial);
    this.deskMesh.position.set(0, 0.62, 0);
    this.deskMesh.receiveShadow = true;
    this.deskMesh.castShadow = true;
    this.group.add(this.deskMesh);

    // Desk Front Apron / Drawer Frame
    const apronGeo = new THREE.BoxGeometry(7.2, 0.35, 0.08);
    const apronMesh = new THREE.Mesh(apronGeo, this.deskMaterial);
    apronMesh.position.set(0, 0.38, 2.0);
    apronMesh.castShadow = true;
    this.group.add(apronMesh);

    // Subtle brass drawer handles
    const handleMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.85 });
    const handleGeo = new THREE.BoxGeometry(0.4, 0.05, 0.06);

    const handleLeft = new THREE.Mesh(handleGeo, handleMat);
    handleLeft.position.set(-2.0, 0.38, 2.06);
    this.group.add(handleLeft);

    const handleRight = new THREE.Mesh(handleGeo, handleMat);
    handleRight.position.set(2.0, 0.38, 2.06);
    this.group.add(handleRight);

    // Solid Wood Desk Legs (Tapered)
    const legGeo = new THREE.CylinderGeometry(0.12, 0.08, 2.8, 16);
    const legPositions = [
      { x: -3.4, z: -1.8 },
      { x: 3.4, z: -1.8 },
      { x: -3.4, z: 1.8 },
      { x: 3.4, z: 1.8 }
    ];

    legPositions.forEach((pos) => {
      const leg = new THREE.Mesh(legGeo, this.deskMaterial);
      leg.position.set(pos.x, -0.8, pos.z);
      leg.castShadow = true;
      this.group.add(leg);
    });

    // 2. BACK WALL (Warm Plaster / Sand Mortar Wall)
    const wallGeo = new THREE.PlaneGeometry(16, 12);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x4D535A, // Neutral dark blue-grey tint matching the moody quiet reference image background
      roughness: 0.9,
      metalness: 0.0,
    });
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallMesh.position.set(0, 3.5, -2.1);
    wallMesh.receiveShadow = true;
    this.group.add(wallMesh);

    // Baseboard Wood Trim on Wall
    const trimGeo = new THREE.BoxGeometry(16, 0.25, 0.06);
    const trimMesh = new THREE.Mesh(trimGeo, this.deskMaterial);
    trimMesh.position.set(0, 0.12, -2.06);
    this.group.add(trimMesh);

    // 3. OAK WOOD FLOOR BELOW DESK
    const floorGeo = new THREE.PlaneGeometry(16, 10);
    const floorMat = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.6,
      metalness: 0.05,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, -2.2, 2.0);
    floorMesh.receiveShadow = true;
    this.group.add(floorMesh);
  }

  public updateWoodStyle(style: DeskWoodStyle) {
    const tex = createWoodTexture(style);
    this.deskMaterial.map = tex;
    this.deskMaterial.needsUpdate = true;
  }
}
