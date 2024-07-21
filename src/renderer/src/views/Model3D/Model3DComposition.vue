<template>
  <div ref="mount" style="width: 100%; height: 100%; position: relative;" @click="clickPosition"
       >
    <!-- 線描画用キャンバス -->
    <canvas ref="canvas2d" style="width: 100%; height: 100%; position: absolute; top: 0px; z-index: 10;"/>
    <!-- vuetify部品用タグ -->
    <div style="width: 100%; height: 100%; position: absolute; top: 0px; z-index: 20;">
      <v-btn ref="point1" size="x-small" @click="event => pointClick(event,0)">point1</v-btn>
      <v-btn ref="point2" size="x-small" @click="event => pointClick(event,1)">point2</v-btn>
    </div>
  </div>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { inject, ref, watch, onMounted, nextTick, onBeforeUnmount } from 'vue';
import { CameraAnimator } from '@renderer/utils/CameraAnimator.js';

const name = 'Model3DComposition';
const darkTheme = inject('darkTheme');
const vuetify = inject('vuetify');

const mount = ref(null); // this.$refs.mount.appendChild(this.renderer.domElement);
const point1 = ref(null);
const point2 = ref(null);
const canvas2d = ref(null);

let animateID = null;
let headerSize = null; // header 分減算用
let scene = null; // new THREE.Scene();
let camera = null; // new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - this.header_size), 0.1, 1000);
let cameraAnimator = null;
let renderer = null; // new THREE.WebGLRenderer({ antialias: true }); // アンチエイリアシングを有効にする
let cube = null;
let cube2 = null;
let clock = null; // new THREE.Clock();
let camerapos = null; // new THREE.Vector3(0, 7, 0);
let targetpos = null; // new THREE.Vector3(0, 5, 0);
let css2drenderer = null; // new CSS2DRenderer();
let label2d = [null, null];
let lineSwitch = null; // false;
let lineStartPosition = null;
let lineTergetIndex = 0;

/*
// タワー用
const points = [
  { x: -2.093, y: 8.291, z: 2.110 }, // 屋根
  { x: 1.2558, y: 0.950, z: -0.955 }, // 柱
];
*/
// ロッジ用
const points = [
  { x: 0.036, y: 5.307, z: 5.658 }, // 注視点 point1 屋根
  { x: -5.955, y: 5.777, z: -0.890 }, // 注視点 point2 柱
];


// テーマ変化通知
watch(darkTheme, (newValue) => {
  if (renderer) { // renderer が生成されてないと背景色を設定できない
    setClearColor();
  }
  console.log('darkTheme.value:', newValue);
}, { immediate: true }); // trueの場合、初期化時にも呼ばれる。falseの場合、変更後に呼ばれる

onBeforeUnmount(() => {
  stopAnimation();
});

// 起動時
onMounted( async () => {
  await nextTick(); // Vueのレンダリングが完了するのを待つ
  const rect = mount.value.getBoundingClientRect(); // div要素のサイズと位置を取得
  lineSwitch = false;
  headerSize = 64; // header 分減算用
  // Three.jsのオブジェクトを直接インスタンスに追加
  scene = new THREE.Scene();
  // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);
  camera.aspect = rect.width / rect.height;
  renderer = new THREE.WebGLRenderer({ antialias: true }); // アンチエイリアシングを有効にする
  cube = null;
  clock = new THREE.Clock();

  // renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(rect.width, rect.height);
  mount.value.appendChild(renderer.domElement);

  // 環境光を作成
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 色と強度を設定
  scene.add(ambientLight);

  // レンダラーの背景色を設定
  setClearColor()
  // renderer.setClearColor(0xf0f0f0); // 明るい灰色に設定

  // 光源を作成
  const light = new THREE.DirectionalLight(0xf0f080, 7);
  light.position.set(10, 100, 200); // 光源の位置を設定（斜め上から）
  scene.add(light);

  // グリッドヘルパーを作成
  const size = 100;
  const divisions = 50;
  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);

  // キューブを作成（サーフェース用）
  const geometry3 = new THREE.BoxGeometry(1, 1, 1);
  const material3 = new THREE.MeshPhysicalMaterial({ color: 0x8080f0 }); // wireframeプロパティをfalseに設定（デフォルト）
  const cube3 = new THREE.Mesh(geometry3, material3);
  cube3.position.y = 0.5;
  cube3.position.x = 2.0;
  scene.add(cube3);

  // キューブを作成（ワイヤーフレーム用）
  const wireframeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x404040, wireframe: true }); // 黒色のワイヤーフレーム
  const wireframeCube = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
  wireframeCube.position.y = 0.5;
  wireframeCube.position.x = 2.0;
  scene.add(wireframeCube);

  // キューブを作成
  const geometry = new THREE.SphereGeometry(1, 32, 32); // 球体のジオメトリに変更
  const material = new THREE.MeshPhysicalMaterial({ color: 0x8080f0 }); // wireframe
  cube = new THREE.Mesh(geometry, material);
  cube.position.y = 0.5;
  scene.add(cube);

  // boxを作成
  const geometry2 = new THREE.BoxGeometry(1, 1, 1);
  const material2 = new THREE.MeshPhysicalMaterial({ color: 0x8080f0 }); // 光源の影響を受け、滑らかなシェーディングが可能なマテリアルに変更
  cube2 = new THREE.Mesh(geometry2, material2);
  cube2.position.y = 0.5;
  cube2.position.z = 2;
  scene.add(cube2);

  // GLTFLoaderのインスタンスを作成
  const loader = new GLTFLoader();
  // GLBファイルの読み込み
  // const glbFileBody = await window.api.getFileBody('/models/model.glb');
  const glbFileBody = await window.api.getFileBody('/models/lodge.glb');
  // console.log("glbFileBody:" + glbFileBody); // 読み込んだglbファイル内を表示
  const parseModel = (buffer) => {
    return new Promise((resolve, reject) => {
      loader.parse(buffer, '', resolve, reject);
    });
  };
  try {
    const gltf = await parseModel(glbFileBody.buffer);
    scene.add(gltf.scene);
  } catch (error) {
    console.error(error);
  }
  /*
  loader.parse(glbFileBody.buffer, '', (gltf) => {
    scene.add(gltf.scene);
  }, function(error) {
    console.error(error);
  });
  */

  // カメラアニメーション生成
  // camera.lookAt(new THREE.Vector3(0, 5, 0)); // 注視点位置
  cameraAnimator = new CameraAnimator(camera);
  cameraAnimator.changeAction(0);

  // css2D レンダーラー作成
  // https://sbcode.net/threejs/glasses/
  css2drenderer = new CSS2DRenderer()
  // css2drenderer.setSize(window.innerWidth, window.innerHeight)
  css2drenderer.setSize(rect.width, rect.height);
  // css2drenderer.domElement.style.position = 'absolute'
  // css2drenderer.domElement.style.top = '64px'
  css2drenderer.domElement.style.position = 'absolute';
  css2drenderer.domElement.style.top = '0px'
  css2drenderer.domElement.style.pointerEvents = 'none'
  // document.body.appendChild(css2drenderer.domElement)
  mount.value.appendChild(css2drenderer.domElement); // mount.value が親要素となる。mount.value(div)タグには relative 指定してある

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const div = document.createElement('div');
    div.textContent = '●';
    div.color="primary"; // vuetify colorに従う
    // div.style.color = 'black';
    label2d[i] = new CSS2DObject(div);
    label2d[i].position.set(point.x, point.y, point.z);
    scene.add(label2d[i]);
  }

  const animate = (currentTime) => {
    animateID = requestAnimationFrame(animate);
    cameraAnimator.animate(currentTime);
    renderer.render(scene, camera);
    css2drenderer.render(scene, camera);

    // 2Dコンテキストを取得
    const ctx = canvas2d.value.getContext('2d');
    ctx.clearRect(0, 0, canvas2d.value.width, canvas2d.value.height);

    // v-chip要素の背景色の取得
    if ( true == lineSwitch ) {
      // 3Dオブジェクトのワールド座標を取得する
      const worldPosition = label2d[lineTergetIndex].getWorldPosition(new THREE.Vector3());
      // スクリーン座標を取得する
      const rect = mount.value.getBoundingClientRect();
      const projection = worldPosition.project(camera);
      const sx = (rect.width / 2) * (+projection.x + 1.0);
      const sy = (rect.height / 2) * (-projection.y + 1.0);
      const colors = vuetify.theme.current.value.colors;
      ctx.strokeStyle = colors['on-background']; //  'rgba(214, 214, 214, 1)'; // 赤色
      ctx.lineWidth = 1;
      // 線を描く
      ctx.beginPath(); // 新しいパスを開始
      ctx.moveTo(lineStartPosition.x, lineStartPosition.y); // パスの開始点を移動
      ctx.lineTo(sx, sy); // 線を描く
      ctx.stroke(); // パスを描画
    }
  };

  animateID = requestAnimationFrame(animate);
  // animate();

  // リサイズイベントのリスナーを追加
  // window.addEventListener('resize', onWindowResize, false);
  const ro = new ResizeObserver(() => {
    onWindowResize();
  });
  ro.observe(mount.value);
});

const stopAnimation = () => {
  cancelAnimationFrame(animateID);
};

/**
 * クリック位置の３Dオブジェクト座標を取得
 * @param {object} event イベント
 */
const clickPosition = (event) => {
  const rect = mount.value.getBoundingClientRect();
  const x = event.clientX - rect.left; // div要素内でのx座標
  const y = event.clientY - rect.top; // div要素内でのy座標
  const mouse = new THREE.Vector2();
  mouse.x = ( x / rect.width ) * 2 - 1; // div要素の幅で正規化
  mouse.y = -( y / rect.height ) * 2 + 1; // div要素の高さで正規化
  // Raycasterインスタンス作成
  const raycaster = new THREE.Raycaster();
  // 取得したX、Y座標でrayの位置を更新
  // cameraは作成済みのThree.jsのカメラ
  raycaster.setFromCamera( mouse, camera );
  // オブジェクトの取得
  // sceneは作成済みのThree.jsのシーン
  const intersects = raycaster.intersectObjects( scene.children );
  if ( intersects.length > 0 ) {
    // クリック位置にオブジェクトがあれば、座標を出力
    console.log( 'x座標=%f', intersects[0].point.x );
    console.log( 'y座標=%f', intersects[0].point.y );
    console.log( 'z座標=%f', intersects[0].point.z );
  }
};

/**
 * リサイズイベント
 */
const onWindowResize = () => {
  // リサイズされたときにレンダラーとカメラのサイズを更新
  if (mount.value) {
    const rect = mount.value.getBoundingClientRect();
    canvas2d.value.width = rect.width;
    canvas2d.value.height = rect.height;
    // const x = rect.left;
    // const y = rect.top;
    const width = mount.value.offsetWidth;
    const height = mount.value.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    css2drenderer.setSize(width, height);
    // console.log(`${x}:${y},${width}:${height}`);
  }
};

/*
 * threejs の背景食を設定
 */
const setClearColor = () => {
  if (darkTheme.value) {
    renderer.setClearColor(0x404040); // 暗い灰色に設定
  } else {
    renderer.setClearColor(0xf0f0f0); // 明るい灰色に設定
  }
};


/*
 * ポイントパネルクリックイベント
 */
const pointClick = (event, index) => {
  if (mount.value) {
    const rect = mount.value.getBoundingClientRect();
    const x = event.clientX - rect.left; // div要素内でのx座標
    const y = event.clientY - rect.top; // div要素内でのy座標
    lineSwitch = true;
    lineTergetIndex = index;
    lineStartPosition = { 'x': x, 'y': y };
    cameraAnimator.changeAction(index+1);
  }
};

</script>

