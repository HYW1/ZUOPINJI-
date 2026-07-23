import * as THREE from 'three';
import { createWallArtTexture, createCorkboardTexture } from '../../../utils/textureGenerator';

export class WallFrames3D {
  public group: THREE.Group;
  public frameMesh: THREE.Mesh;
  public frameArtMaterial: THREE.MeshStandardMaterial;

  constructor(wallArtStyle: 'fuji' | 'kanji' | 'botanical' | 'minimalist' = 'fuji') {
    this.group = new THREE.Group();
    this.group.name = 'wall_frames';

    // Solid Wood Frame Border Material
    const frameWoodMat = new THREE.MeshStandardMaterial({
      color: 0x5c4033, // Rich dark oak picture frame
      roughness: 0.5,
      metalness: 0.1,
    });

    // Glass Cover Reflection Material
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.8,
      opacity: 0.3,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
    });

    // 1. CENTER MAIN WALL PICTURE FRAME (Matching reference image center wall art)
    const frameWidth = 2.2;
    const frameHeight = 1.8;
    const frameDepth = 0.08;

    const frameGroup = new THREE.Group();

    // Wood Bezel
    const bezelGeo = new THREE.BoxGeometry(frameWidth, frameHeight, frameDepth);
    const bezelMesh = new THREE.Mesh(bezelGeo, frameWoodMat);
    bezelMesh.castShadow = true;
    frameGroup.add(bezelMesh);

    // Picture Art Canvas
    const artTex = createWallArtTexture(wallArtStyle);
    this.frameArtMaterial = new THREE.MeshStandardMaterial({
      map: artTex,
      roughness: 0.8,
      metalness: 0.0,
    });

    const artGeo = new THREE.PlaneGeometry(frameWidth - 0.2, frameHeight - 0.2);
    this.frameMesh = new THREE.Mesh(artGeo, this.frameArtMaterial);
    this.frameMesh.position.set(0, 0, frameDepth * 0.5 + 0.005);
    frameGroup.add(this.frameMesh);

    // Glass Panel Front
    const glassMesh = new THREE.Mesh(artGeo, glassMat);
    glassMesh.position.set(0, 0, frameDepth * 0.5 + 0.01);
    frameGroup.add(glassMesh);

    frameGroup.position.set(-0.2, 2.45, -2.06); // Wall center-left above typewriter
    this.group.add(frameGroup);

    // 2. RIGHT CORKBOARD BULLETIN BOARD (Matching reference image right wall panel)
    const corkGroup = new THREE.Group();
    const corkWidth = 1.6;
    const corkHeight = 2.0;

    const corkFrameMesh = new THREE.Mesh(
      new THREE.BoxGeometry(corkWidth, corkHeight, frameDepth),
      frameWoodMat
    );
    corkFrameMesh.castShadow = true;
    corkGroup.add(corkFrameMesh);

    const corkTex = createCorkboardTexture();
    const corkMat = new THREE.MeshStandardMaterial({
      map: corkTex,
      roughness: 0.95,
    });

    const corkMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(corkWidth - 0.15, corkHeight - 0.15),
      corkMat
    );
    corkMesh.position.set(0, 0, frameDepth * 0.5 + 0.005);
    corkGroup.add(corkMesh);

    // Pinned Sticky Notes / Polaroid Photos on Corkboard
    const noteGeo = new THREE.PlaneGeometry(0.5, 0.6);
    const noteMat = new THREE.MeshStandardMaterial({ color: 0xfffae6, roughness: 0.8 });
    const noteMesh = new THREE.Mesh(noteGeo, noteMat);
    noteMesh.position.set(-0.3, 0.3, frameDepth * 0.5 + 0.01);
    noteMesh.rotation.z = -0.1;
    corkGroup.add(noteMesh);

    // Push Pin
    const pinGeo = new THREE.SphereGeometry(0.03, 12, 12);
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: 0.3 });
    const pinMesh = new THREE.Mesh(pinGeo, pinMat);
    pinMesh.position.set(-0.3, 0.56, frameDepth * 0.5 + 0.02);
    corkGroup.add(pinMesh);

    corkGroup.position.set(2.2, 2.45, -2.06); // Right side wall
    this.group.add(corkGroup);
  }

  public updateArtStyle(style: 'fuji' | 'kanji' | 'botanical' | 'minimalist') {
    const tex = createWallArtTexture(style);
    this.frameArtMaterial.map = tex;
    this.frameArtMaterial.needsUpdate = true;
  }
}
