import * as THREE from '../../libs/three.module.js';
import persCamera from '../camera/persCamera.js';
import Sea from '../objects/Sea.js';

export class Scene extends THREE.Scene {

    constructor(){

        super();

        //カメラ
        this._persCamera = new persCamera();//thisにする
        this.camera = this._persCamera; //初期値

        //メッシュの海
        this._sea = new Sea();
        this._sea.position.z = -1000;
        this._sea.position.y = 100;
        this._sea.rotation.y = 0 * Math.PI/180;
        this._sea.rotation.x = 15 * Math.PI/180;
        this.add(this._sea);

    }

    update(){

        this._sea.update();

    }

}