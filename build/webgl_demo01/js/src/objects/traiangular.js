import * as THREE from '../../libs/three.module.js';

export default class Traiangular extends THREE.Object3D {

  constructor() {
    super();
    this.group;

    // var geometry = new THREE.BufferGeometry();
    // geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    // geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // var material = new THREE.ShaderMaterial({
    //   uniforms: {
    //     color: { value: new THREE.Color(0x000000) },
    //   },
    //   vertexShader: vertexshader,
    //   fragmentShader: fragmentshader
    // });


    // this.particles = new THREE.Points(geometry, material);

    // this.add(this.particles);

    this.setup();
  }

  setup() {

    /**
     * Object
     */
    const twoPi = Math.PI * 2;
    this.group = new THREE.Group();
    const topGeometry = new THREE.CylinderGeometry(24, 16, 10, 8);
    const middleGeometry = new THREE.CylinderGeometry(16, 8, 10, 8);
    const bottomGeometry = new THREE.CylinderGeometry(8, 0.1, 10, 8);



    // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });
    const meshMaterial = new THREE.MeshPhongMaterial({ color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true });
    // const meshMaterial = new THREE.MeshBasicMaterial({ color: 0x156289 });

    const bottomMesh = new THREE.Mesh(bottomGeometry, meshMaterial);

    const middleMesh = new THREE.Mesh(middleGeometry, meshMaterial);
    const topeMesh = new THREE.Mesh(topGeometry, meshMaterial);
    topeMesh.position.y = 24;
    middleMesh.position.y = 12;

    const bottomLine = new THREE.LineSegments(bottomGeometry, lineMaterial);
    const middleLine = new THREE.LineSegments(middleGeometry, lineMaterial);
    const topLine = new THREE.LineSegments(topGeometry, lineMaterial);
    topLine.position.y = 24;
    middleLine.position.y = 12;


    this.group.add(bottomMesh);
    this.group.add(middleMesh);
    this.group.add(topeMesh);

    // group.add(bottomLine);
    // group.add(middleLine);
    // group.add(topLine);
    // this.group.add(new THREE.LineSegments(geometry, lineMaterial));
    // group.rotation.x = Math.PI;

    this.add(this.group);

  }


  update() {
    // Object
    this.group.rotation.y += 0.005;
  }

}

// const vertexshader = `
//     attribute float scale;

//     void main() {
//         vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
//         //gl_PointSize = clamp(scale * ( 200.0 / - mvPosition.z ), 0.1, 4.0);
//         gl_PointSize = clamp(( 1000.0 / - mvPosition.z ), 0.1, 8.0)*1.2;
//         gl_Position = projectionMatrix * mvPosition;
//     }
// `;
// const fragmentshader = `
//     uniform vec3 color;

//     void main() {
//     if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
//     gl_FragColor = vec4( color, 0.8 );
//     }
// `;
