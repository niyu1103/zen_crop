import * as THREE from '../../libs/three.module.js';
// import * as THREE from 'three'

export default class Sea extends THREE.Object3D {
  constructor() {
    super();
    this.init();
    this.isVisible = false;
  }

  init() {
    this.SEPARATION = 20, this.AMOUNTX = 200, this.AMOUNTY = 200;
    this.particles = 0, this.count = 0;
  }

  setup() {
    this.isVisible = true;
    const numParticles = this.AMOUNTX * this.AMOUNTY;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);
    let i = 0, j = 0;
    for (var ix = 0; ix < this.AMOUNTX; ix++) {
      for (var iy = 0; iy < this.AMOUNTY; iy++) {
        positions[i] = ix * this.SEPARATION - ((this.AMOUNTX * this.SEPARATION) / 2); // x
        positions[i + 1] = 0; // y
        positions[i + 2] = iy * this.SEPARATION - ((this.AMOUNTY * this.SEPARATION) / 2); // z
        scales[j] = 1;
        i += 3;
        j++;
      }
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x000000) },
      },
      vertexShader: vertexshader,
      fragmentShader: fragmentshader
    });
    // console.log(this.material.opacity);
    // this.material.opacity = 0;
    this.particles = new THREE.Points(this.geometry, this.material);
    this.particles.position.y = -50;
    this.add(this.particles);
    this.position.z = -1000;
    this.position.y = 250;
    this.rotation.y = 0 * Math.PI / 180;
    this.rotation.x = 15 * Math.PI / 180;
  }

  update() {
    const positions = this.particles.geometry.attributes.position.array;
    const scales = this.particles.geometry.attributes.scale.array;
    let i = 0, j = 0;

    for (var ix = 0; ix < this.AMOUNTX; ix++) {
      for (var iy = 0; iy < this.AMOUNTY; iy++) {
        positions[i + 1] = (Math.sin((ix * 0.5 + this.count) * 0.3) * 50) +
          (Math.sin((iy * 0.5 + this.count) * 0.5) * 50);
        scales[j] = (Math.sin((ix * 0.5 + this.count) * 0.3) + 1) * 8 +
          (Math.sin((iy * 0.5 + this.count) * 0.5) + 1) * 8;
        i += 3;
        j++;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
      this.particles.geometry.attributes.scale.needsUpdate = true;
      this.count += 0.0002;
    }
  }

  destroy() {
    this.isVisible = false;
    this.remove(this.particles);
    this.particles.geometry.dispose();
    this.particles.material.dispose();
  }
}

const vertexshader = `
    attribute float scale;
    void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        //gl_PointSize = clamp(scale * ( 200.0 / - mvPosition.z ), 0.1, 4.0);
        gl_PointSize = clamp(( 1000.0 / - mvPosition.z ), 0.1, 8.0)*1.2;
        gl_Position = projectionMatrix * mvPosition;
    }
`;
const fragmentshader = `
    uniform vec3 color;

    void main() {
    if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
    gl_FragColor = vec4( color, 0.8 );
    }
`;
