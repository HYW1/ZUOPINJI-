import * as THREE from 'three';

export class Books3D {
  public group: THREE.Group;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'books_stack';

    // Book Cover Colors matching reference image (Ochre / Mustard Yellow, Deep Teal / Navy, Warm Red/Orange)
    const bookConfigs = [
      { width: 0.75, depth: 1.05, height: 0.12, color: 0xc0392b, rot: 0.05 }, // Warm Red Book (Bottom)
      { width: 0.72, depth: 1.00, height: 0.11, color: 0xd35400, rot: -0.08 }, // Ochre Book (Middle)
      { width: 0.68, depth: 0.92, height: 0.10, color: 0x273c75, rot: 0.02 }, // Navy Teal Book (Top)
    ];

    let currentY = 0;

    bookConfigs.forEach((b) => {
      const bookGroup = new THREE.Group();

      // Cover Material
      const coverMat = new THREE.MeshStandardMaterial({
        color: b.color,
        roughness: 0.65,
        metalness: 0.05,
      });

      // Pages Material
      const pagesMat = new THREE.MeshStandardMaterial({
        color: 0xf5eedc, // Off-white cream paper pages
        roughness: 0.9,
      });

      // Book Body (Pages)
      const pagesGeo = new THREE.BoxGeometry(b.width * 0.96, b.height * 0.9, b.depth * 0.96);
      const pagesMesh = new THREE.Mesh(pagesGeo, pagesMat);
      pagesMesh.position.set(0, b.height * 0.5, 0);
      pagesMesh.castShadow = true;
      pagesMesh.receiveShadow = true;
      bookGroup.add(pagesMesh);

      // Book Cover Spine & Boards
      const coverGeo = new THREE.BoxGeometry(b.width, b.height, b.depth);
      const coverMesh = new THREE.Mesh(coverGeo, coverMat);
      coverMesh.position.set(0, b.height * 0.5, 0);
      coverMesh.castShadow = true;
      coverMesh.receiveShadow = true;
      bookGroup.add(coverMesh);

      // Ribbon Bookmark on top book
      if (b === bookConfigs[bookConfigs.length - 1]) {
        const ribbonGeo = new THREE.BoxGeometry(0.06, 0.01, 0.6);
        const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3 });
        const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
        ribbonMesh.position.set(0.1, b.height + 0.005, 0.4);
        ribbonMesh.rotation.y = 0.2;
        bookGroup.add(ribbonMesh);
      }

      bookGroup.position.set(0, currentY, 0);
      bookGroup.rotation.y = b.rot;

      this.group.add(bookGroup);
      currentY += b.height;
    });

    // Position on right side of desk (Clear of typewriter right cheek)
    this.group.position.set(1.55, 0.76, 0.15);
  }
}
