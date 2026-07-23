import * as THREE from 'three';

export class DeskLamp3D {
  public group: THREE.Group;
  public spotLight: THREE.SpotLight;
  public bulbMesh: THREE.Mesh;
  public lampHeadGroup: THREE.Group;
  private bulbMaterial: THREE.MeshStandardMaterial;
  private pointLight: THREE.PointLight;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'desk_lamp';

    // Vintage Dark Bronze / Charcoal Metal Material
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x3d352e, // Warm bronze-charcoal metal
      roughness: 0.32,
      metalness: 0.78,
    });

    // Brass Joints & Accents Material
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.22,
      metalness: 0.88,
    });

    // Place lamp base securely on upper left corner of desk
    this.group.position.set(-1.55, 0.76, -0.55);

    // 1. LAMP BASE (Rounded Beveled Base)
    const baseShape = new THREE.Shape();
    const radius = 0.30;
    baseShape.absarc(0, 0, radius, 0, Math.PI * 2, false);

    const baseExtrudeSettings = {
      depth: 0.07,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };

    const baseGeo = new THREE.ExtrudeGeometry(baseShape, baseExtrudeSettings);
    baseGeo.rotateX(Math.PI / 2);
    const baseMesh = new THREE.Mesh(baseGeo, bodyMat);
    baseMesh.position.set(0, 0.05, 0);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    this.group.add(baseMesh);

    // Switch Toggle on Base
    const switchGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.06, 16);
    const switchMesh = new THREE.Mesh(switchGeo, brassMat);
    switchMesh.position.set(0.12, 0.09, 0.08);
    this.group.add(switchMesh);

    // Base Joint Mount
    const mountGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.08, 20);
    const mountMesh = new THREE.Mesh(mountGeo, brassMat);
    mountMesh.position.set(0, 0.12, 0);
    this.group.add(mountMesh);

    // 2. LOWER ARM (Angled upwards & right)
    const lowerArmGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.85, 16);
    const lowerArm = new THREE.Mesh(lowerArmGeo, bodyMat);
    lowerArm.position.set(0.16, 0.50, 0.08);
    lowerArm.rotation.z = -0.38;
    lowerArm.rotation.x = -0.15;
    lowerArm.castShadow = true;
    this.group.add(lowerArm);

    // Lower Brass Joint Sphere
    const joint1Geo = new THREE.SphereGeometry(0.05, 20, 20);
    const joint1 = new THREE.Mesh(joint1Geo, brassMat);
    joint1.position.set(0.31, 0.88, 0.15);
    this.group.add(joint1);

    // 3. UPPER ARM (Angled forward towards center)
    const upperArmGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.75, 16);
    const upperArm = new THREE.Mesh(upperArmGeo, bodyMat);
    upperArm.position.set(0.52, 1.15, 0.28);
    upperArm.rotation.z = 0.52;
    upperArm.rotation.x = 0.22;
    upperArm.castShadow = true;
    this.group.add(upperArm);

    // Upper Swivel Brass Joint
    const joint2Geo = new THREE.SphereGeometry(0.052, 20, 20);
    const joint2 = new THREE.Mesh(joint2Geo, brassMat);
    joint2.position.set(0.72, 1.38, 0.40);
    this.group.add(joint2);

    // 4. LAMP HEAD GROUP (Shade + Bulb + Light)
    this.lampHeadGroup = new THREE.Group();
    this.lampHeadGroup.position.set(0.72, 1.38, 0.40);

    // Point shade downwards and inward towards typewriter paper
    this.lampHeadGroup.rotation.x = 0.55;
    this.lampHeadGroup.rotation.z = -0.38;

    // Brass Top Cap of Shade (Attached at joint 2)
    const topCapGeo = new THREE.CylinderGeometry(0.07, 0.09, 0.08, 24);
    const topCapMesh = new THREE.Mesh(topCapGeo, brassMat);
    topCapMesh.position.set(0, -0.04, 0);
    this.lampHeadGroup.add(topCapMesh);

    // Conical Lamp Shade Geometry - Origin offset so top sits at Y=0 (Zero clipping with arm!)
    const shadeGeo = new THREE.CylinderGeometry(0.09, 0.28, 0.36, 32, 1, true);
    shadeGeo.translate(0, -0.18, 0); // Shift body downward below top cap

    const shadeMesh = new THREE.Mesh(shadeGeo, bodyMat);
    shadeMesh.position.set(0, -0.08, 0);
    shadeMesh.castShadow = false; // Disable self-shadowing clipping artifacts
    this.lampHeadGroup.add(shadeMesh);

    // Inner Gold Foil Reflector inside shade
    const innerShadeMat = new THREE.MeshStandardMaterial({
      color: 0xffda91,
      roughness: 0.18,
      metalness: 0.92,
      side: THREE.BackSide,
    });
    const innerShadeMesh = new THREE.Mesh(shadeGeo, innerShadeMat);
    innerShadeMesh.position.set(0, -0.08, 0);
    this.lampHeadGroup.add(innerShadeMesh);

    // Rounded Brass Rim Ring around lower edge of shade
    const shadeRimGeo = new THREE.TorusGeometry(0.28, 0.012, 16, 32);
    const shadeRimMesh = new THREE.Mesh(shadeRimGeo, brassMat);
    shadeRimMesh.rotation.x = Math.PI / 2;
    shadeRimMesh.position.set(0, -0.26, 0);
    this.lampHeadGroup.add(shadeRimMesh);

    // 5. GLOWING BULB & LIGHT SOURCES
    const bulbGeo = new THREE.SphereGeometry(0.085, 24, 24);
    this.bulbMaterial = new THREE.MeshStandardMaterial({
      color: 0xfffae6,
      emissive: 0xffa020,
      emissiveIntensity: 2.2,
      roughness: 0.1,
    });
    this.bulbMesh = new THREE.Mesh(bulbGeo, this.bulbMaterial);
    this.bulbMesh.position.set(0, -0.20, 0);
    this.lampHeadGroup.add(this.bulbMesh);

    // Warm Ambient PointLight from inside shade with physically accurate decay (decay = 2.0)
    this.pointLight = new THREE.PointLight(0xffa836, 2.8, 6.0, 2.0);
    this.pointLight.position.set(0, -0.20, 0);
    this.lampHeadGroup.add(this.pointLight);

    // Warm Spotlight directed down towards typewriter paper
    this.spotLight = new THREE.SpotLight(0xffaa40, 5.5);
    this.spotLight.position.set(0, -0.20, 0);
    this.spotLight.angle = Math.PI / 2.6;
    this.spotLight.penumbra = 0.65;
    this.spotLight.decay = 2.0;
    this.spotLight.distance = 9.0;
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;
    this.spotLight.shadow.bias = 0.0001;

    // Target on typewriter paper relative to desk lamp base
    const target = new THREE.Object3D();
    target.position.set(1.4, 0.2, 0.55);
    this.group.add(target);
    this.spotLight.target = target;

    this.lampHeadGroup.add(this.spotLight);
    this.group.add(this.lampHeadGroup);
  }

  public setLampState(isOn: boolean, intensity = 1.0, colorHex = '#ffb852') {
    if (isOn) {
      this.spotLight.visible = true;
      this.spotLight.intensity = 4.2 * intensity;
      this.spotLight.color.setStyle(colorHex);
      this.pointLight.visible = true;
      this.pointLight.intensity = 2.2 * intensity;
      this.pointLight.color.setStyle(colorHex);
      this.bulbMaterial.emissive.setStyle(colorHex);
      this.bulbMaterial.emissiveIntensity = 2.2 * intensity;
    } else {
      this.spotLight.visible = false;
      this.pointLight.visible = false;
      this.bulbMaterial.emissive.setStyle('#221100');
      this.bulbMaterial.emissiveIntensity = 0;
    }
  }
}
