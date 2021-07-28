import { randomNum } from '../math';


const modelData = {
  canvasSize: {
    home: {
      // width: 1152,
      width: 768,
      height: 800,
    },
    about: {
      width: window.innerWidth,
      height: window.innerHeight
    },
  },
  camera: {
    pos: [
      {
        // 0 Top
        x: 0,
        y: 0,
        z: -50,
      },
      {
        // 1 Vision
        x: 38,
        y: -10,
        z: -30
      },
      {
        // 2 Value
        x: 40,
        y: -18,
        z: 48,
      },
      {
        //  3 Pholosophy
        x: randomNum(0, 20),
        y: randomNum(50, 60),
        z: randomNum(0, 20),
        // x: randomNum(-20, 20),
        // y: randomNum(50, 70),
        // z: randomNum(0, 20),
      },
      {
        // 4 Mobile Top
        x: 0,
        y: 0,
        z: -60,
      },
      {
        // 5 Mobile Vision
        x: 18,
        y: -10,
        z: -80
      },
      {
        // 6 Mobile  Value
        x: 50,
        y: -38,
        z: 68,
      },
      {
        //  7 Mobile  Pholosophy
        x: randomNum(-20, 20),
        y: randomNum(50, 70),
        z: randomNum(0, 20),
      },
      {
        // 8 Home Particle
        x: 0,
        y: 50,
        z: 400,
      },
    ],
    look: [
      {
        x: 0,
        y: 0,
        z: 0
      },
      {
        // Vision
        // x: randomNum(-20, 20),
        // y: randomNum(-20, 20),
        // z: randomNum(-20, 20),
        x: 0,
        y: 0,
        z: 0,

      },
      {
        // Value
        // x: randomNum(0, 20),
        // y: randomNum(0, 20),
        // z: randomNum(0, 20),
        x: 15,
        y: 18,
        z: 2,
      },
      {
        // Philosophy
        x: randomNum(-10, 10),
        y: randomNum(-10, 10),
        z: randomNum(-10, 10),
        // x: 0,
        // y: 0,
        // z: 0
      },
    ],
  },

  triangle: {
    pos: [
      {
        x: 0,
        y: -15,
        z: 0,
      },
      {
        // Vison
        // x: randomNum(-50, 50),
        // y: randomNum(-50, 50),
        // z: randomNum(-50, 50),
        x: -15,
        y: -17,
        z: -40,
        // x: -25,
        // y: -20,
        // z: -15
      },
      {
        // Value
        // x: randomNum(-50, 50),
        // y: randomNum(-50, 50),
        // z: randomNum(-50, 50),
        x: 40,
        y: 20,
        z: -20,
      },

      {
        // Philosophy
        x: -10,
        y: 40,
        z: 10,
      },
    ],
    colors: [
      {
        main: 0x47B4BB,
        emissive: 0x173A3D,
      },
      {
        main: 0x476EBB,
        emissive: 0x192742,
      },
      {
        main: 0x6347BB,
        emissive: 0x271A4E,
      },
    ],
    pointsPos: [
      {
        x: 0,
        y: 14,
        z: 0,
      },
      {
        x: 0,
        y: -4,
        z: 0,
      },
      {
        x: 0,
        y: -15,
        z: 0,
      },
      // Mobile
      {
        x: 0,
        y: 15,
        z: 0,
      },
      {
        x: 0,
        y: 3,
        z: 0,
      },
      {
        x: 0,
        y: -8,
        z: 0,
      }
    ]
  },
  background: {
    colors: [0xEEEEEE, 0x111111]
  },
  // nullComp: {
  //   pos: [
  //     {
  //       x: modelData.camera.look.x,
  //       y: modelData.camera.look.y,
  //       z: modelData.camera.look.z,
  //     },
  //     {
  //       x: 50,
  //       y: 0.2,
  //       z: 0,
  //     },
  //     {
  //       x: 0,
  //       y: 0,
  //       z: 0,
  //     },
  //     {
  //       x: 0,
  //       y: 0,
  //       z: 0,
  //     },
  //   ]
  // }
};
export { modelData };
