<template>
  <div ref="mount" style="width: 100%; height: 100%;" @click="clickPosition"/>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { inject } from 'vue';
// import modelpath from '/models/model.glb'

export default {
  name: 'Model3D',
  data() {
    return {
      // Three.jsのオブジェクトはここでは初期化しない
    };
  },
  inject: ['darkTheme'],
  watch: {
    darkTheme: {
      immediate: true,
      handler(newValue) {
        if (this.renderer) { // renderer が生成されてないと背景色を設定できない
          this.setClearColor();
        }
        console.log('darkTheme.value:', newValue);
      },
    },
  },
  async mounted() {
    this.header_size = 64; // header 分減算用
    // Three.jsのオブジェクトを直接インスタンスに追加
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - this.header_size), 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true }); // アンチエイリアシングを有効にする
    this.cube = null;
    this.clock = new THREE.Clock();

    this.renderer.setSize(window.innerWidth, (window.innerHeight - this.header_size));
    this.$refs.mount.appendChild(this.renderer.domElement);

    // 環境光を作成
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 色と強度を設定
    this.scene.add(ambientLight);

    // レンダラーの背景色を設定
    this.setClearColor()
    // this.renderer.setClearColor(0xf0f0f0); // 明るい灰色に設定


    // 光源を作成
    const light = new THREE.DirectionalLight(0xf0f080, 7);
    light.position.set(10, 100, 200); // 光源の位置を設定（斜め上から）
    this.scene.add(light);

    // グリッドヘルパーを作成
    const size = 100;
    const divisions = 50;
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);


    // キューブを作成（サーフェース用）
    const geometry3 = new THREE.BoxGeometry(1, 1, 1);
    const material3 = new THREE.MeshPhysicalMaterial({ color: 0x8080f0 }); // wireframeプロパティをfalseに設定（デフォルト）
    const cube3 = new THREE.Mesh(geometry3, material3);
    cube3.position.y = 0.5;
    cube3.position.x = 2.0;
    this.scene.add(cube3);

    // キューブを作成（ワイヤーフレーム用）
    const wireframeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x404040, wireframe: true }); // 黒色のワイヤーフレーム
    const wireframeCube = new THREE.Mesh(geometry3, wireframeMaterial);
    wireframeCube.position.y = 0.5;
    wireframeCube.position.x = 2.0;
    this.scene.add(wireframeCube);

    // キューブを作成
    const geometry = new THREE.SphereGeometry(1, 32, 32); // 球体のジオメトリに変更
    const material = new THREE.MeshPhysicalMaterial({ color: 0x8080f0 }); // wireframe
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.y = 0.5;
    this.scene.add(this.cube);

    // boxを作成
    const geometry2 = new THREE.BoxGeometry(1, 1, 1);
    const material2 = new THREE.MeshPhysicalMaterial({ color: 0x8080f0 }); // 光源の影響を受け、滑らかなシェーディングが可能なマテリアルに変更
    this.cube2 = new THREE.Mesh(geometry2, material2);
    this.cube2.position.y = 0.5;
    this.cube2.position.z = 2;
    this.scene.add(this.cube2);

    // GLBファイルの読み込み
    // import Versions from '@renderer/components/Versions.vue'
    // loader.load(modelpath, (gltf) => {

    // GLTFLoaderのインスタンスを作成
    const loader = new GLTFLoader();
    // // web(npm run dev開発)サーバから読み込み用。buildすると開発サーバ起動しないので使えない...
    // loader.load('/models/model.glb', (gltf) => {  // src/renderer/public/models/model.glb ファイルを読み込む
    //   const model = gltf.scene;
    //   scene.value.add(model);
    // }, undefined, function (error) {
    //   console.error(error);
    // });
    const glbFileBody = await window.api.getFileBody('/models/model.glb');
    console.log("glbFileBody:" + glbFileBody);
    loader.parse(glbFileBody.buffer, '', (gltf) => {
      this.scene.add(gltf.scene);
    }, function(error) {
      console.error(error);
    });

    // カメラ位置
    this.camerapos = new THREE.Vector3(0, 7, 0);
    this.camerapos.offset = 7;
    this.camerapos.z = this.camerapos.offset;
    this.camera.position.x = this.camerapos.x;
    this.camera.position.y = this.camerapos.y;
    this.camera.position.z = this.camerapos.z;
    // カメラターゲット
    this.targetpos = new THREE.Vector3(0, 5, 0);

    const animate = () => {
      requestAnimationFrame(animate);

      // キューブの周りをカメラが回るようにする
      const elapsedTime = this.clock.getElapsedTime();
      this.camera.position.x = Math.cos(elapsedTime * 0.1) * this.camerapos.offset;
      this.camera.position.z = Math.sin(elapsedTime * 0.1) * this.camerapos.offset;

      this.camera.lookAt(this.targetpos);
      this.renderer.render(this.scene, this.camera);
    };

    animate();

    // リサイズイベントのリスナーを追加
    window.addEventListener('resize', this.onWindowResize, false);
  },
  beforeDestroy () {
    // コンポーネントが破棄される前にリスナーを削除
    window.removeEventListener('resize', this.onWindowResize);
  },
  methods: {
    /*
    onWindowResize() {
      // レンダラーとカメラのサイズを更新
      this.$nextTick(() => {
        // FIXME: 次の描画タイミングで mount.clientWidth mount.clientHeight を参照しても正しく反映されない。。。
        //        仕方がないから windowサイズで更新しているが、headerサイズ分マイナスして計算
        if (this.$refs.mount) {
          // this.renderer.domElement.style.width = '';
          // this.renderer.domElement.style.height = '';
          this.camera.aspect = this.$refs.mount.clientWidth / this.$refs.mount.clientHeight;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(this.$refs.mount.clientWidth, this.$refs.mount.clientHeight);
        }
      })
    },
    */
    clickPosition( event ) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // var x = event.clientX;
      // var y = event.clientY;

      const mouse = new THREE.Vector2();
      mouse.x = ( x / window.innerWidth ) * 2 - 1;
      mouse.y = -( y / window.innerHeight ) * 2 + 1;

      // Raycasterインスタンス作成
      const raycaster = new THREE.Raycaster();
      // 取得したX、Y座標でrayの位置を更新
      // cameraは作成済みのThree.jsのカメラ
      raycaster.setFromCamera( mouse, this.camera );
      // オブジェクトの取得
      // sceneは作成済みのThree.jsのシーン
      const intersects = raycaster.intersectObjects( this.scene.children );
      // WEBコンソールにオブジェクト上の座標を出力
      console.log( 'x座標=%f', intersects[0].point.x );
      console.log( 'y座標=%f', intersects[0].point.y );
      console.log( 'z座標=%f', intersects[0].point.z );
    },
    onWindowResize() {
      // ブラウザウィンドウがリサイズされたときにレンダラーとカメラのサイズを更新
      this.camera.aspect = window.innerWidth / (window.innerHeight - this.header_size);
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, (window.innerHeight - this.header_size));
    },
    setClearColor() {
      if (this.darkTheme) {
        this.renderer.setClearColor(0x404040); // 暗い灰色に設定
      } else {
        this.renderer.setClearColor(0xf0f0f0); // 明るい灰色に設定
      }
    },
  },
};
</script>
