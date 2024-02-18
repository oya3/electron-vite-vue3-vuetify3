<template>
  <div ref="mount" style="width: 100%; height: 100%; position: relative;" @click="clickPosition"/>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { inject, ref, watch, onMounted, nextTick } from 'vue';

const name = 'Model3DComposition';
const darkTheme = inject('darkTheme');
const mount = ref(null); // this.$refs.mount.appendChild(this.renderer.domElement);

let headerSize = null; // header 分減算用
let scene = null; // new THREE.Scene();
let camera = null; // new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - this.header_size), 0.1, 1000);
let renderer = null; // new THREE.WebGLRenderer({ antialias: true }); // アンチエイリアシングを有効にする
let cube = null;
let cube2 = null;
let clock = null; // new THREE.Clock();
let camerapos = null; // new THREE.Vector3(0, 7, 0);
let targetpos = null; // new THREE.Vector3(0, 5, 0);
let css2drenderer = null; // new CSS2DRenderer();
let label2d = null;
let canvas2d = null;

// テーマ変化通知
watch(darkTheme, (newValue) => {
  if (renderer) { // renderer が生成されてないと背景色を設定できない
    setClearColor();
  }
  console.log('darkTheme.value:', newValue);
}, { immediate: true }); // trueの場合、初期化時にも呼ばれる。falseの場合、変更後に呼ばれる

// 起動時
onMounted( async () => {
  await nextTick(); // Vueのレンダリングが完了するのを待つ
  const rect = mount.value.getBoundingClientRect(); // div要素のサイズと位置を取得
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
  const wireframeCube = new THREE.Mesh(geometry3, wireframeMaterial);
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
  const glbFileBody = await window.api.getFileBody('/models/model.glb');
  console.log("glbFileBody:" + glbFileBody);
  loader.parse(glbFileBody.buffer, '', (gltf) => {
    scene.add(gltf.scene);
  }, function(error) {
    console.error(error);
  });

  // カメラ位置
  camerapos = new THREE.Vector3(0, 7, 0);
  camerapos.offset = 7;
  camerapos.z = camerapos.offset;
  camera.position.x = camerapos.x;
  camera.position.y = camerapos.y;
  camera.position.z = camerapos.z;
  // カメラターゲット
  targetpos = new THREE.Vector3(0, 5, 0);

  // 2D パネル作成
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

  const div = document.createElement('div');
  div.textContent = '●';
  div.style.color = 'black';
  label2d = new CSS2DObject(div);
  label2d.position.set(-2.093, 8.291, 2.110);
  scene.add(label2d);

  // 2D canvasパネル
  canvas2d = document.createElement('canvas');
  canvas2d.style.position = 'absolute';
  canvas2d.style.top = '0px'
  canvas2d.style.pointerEvents = 'none'
  canvas2d.width = rect.width;
  canvas2d.height = rect.height;
  mount.value.appendChild(canvas2d);

  // const geometryLine = new THREE.Geometry();
  // geometryLine.vertices.push(new THREE.Vector3(10, 20, 0));
  // geometryLine.vertices.push(new THREE.Vector3(100, 200, 0));
  // const materialLine = new THREE.MeshPhysicalMaterial({ color: 0x8080f0 });
  // // 線の作成
  // const line = new THREE.Line(geometryLine, materialLine);

  // // 線のマテリアルを作成
  // const materialLine = new THREE.LineBasicMaterial({ color: 0xff00ff });
  // // 線を引くための頂点を設定
  // const geometryLine = new THREE.BufferGeometry();
  // geometryLine.setFromPoints([
  //   new THREE.Vector3(10, 20, 0),
  //   new THREE.Vector3(100, 200, 0),
  // ]);
  // // 線の作成
  // const line = new THREE.Line(geometryLine, materialLine);
  // scene.add(line);

  const animate = () => {
    // const left2 = label2d.element.style.left;
    // const top2 = label2d.element.style.top;
    requestAnimationFrame(animate);
    // キューブの周りをカメラが回るようにする
    const elapsedTime = clock.getElapsedTime();
    camera.position.x = Math.cos(elapsedTime * 0.1) * camerapos.offset;
    camera.position.z = Math.sin(elapsedTime * 0.1) * camerapos.offset;
    // y(上から）
    // camera.position.x = 0;
    // camera.position.y = 30;
    // camera.position.z = 0;
    // // X（左から）
    // camera.position.x = -10;
    // camera.position.y = targetpos.y+2;
    // camera.position.z = 0;
    camera.lookAt(targetpos);
    renderer.render(scene, camera);
    css2drenderer.render(scene, camera);


    // 3Dオブジェクトのワールド座標を取得する
    const worldPosition = label2d.getWorldPosition(new THREE.Vector3());
    // スクリーン座標を取得する
    const rect = mount.value.getBoundingClientRect();
    const projection = worldPosition.project(camera);
    const sx = (rect.width / 2) * (+projection.x + 1.0);
    const sy = (rect.height / 2) * (-projection.y + 1.0);

    // 2Dコンテキストを取得
    const ctx = canvas2d.getContext('2d');
    ctx.clearRect(0, 0, canvas2d.width, canvas2d.height);
    // 線を描く
    ctx.beginPath(); // 新しいパスを開始
    ctx.moveTo(0, 0); // パスの開始点を移動
    ctx.lineTo(sx, sy); // 線を描く
    ctx.stroke(); // パスを描画

    // const left = label2d.element.style.left;
    // const top = label2d.element.style.top;
    // console.log(`label2d = ${top}:${left}`);
  };

  animate();

  // リサイズイベントのリスナーを追加
  // window.addEventListener('resize', onWindowResize, false);
  const ro = new ResizeObserver(() => {
    onWindowResize();
  });
  ro.observe(mount.value);
});

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

  // WEBコンソールにオブジェクト上の座標を出力
  console.log( 'x座標=%f', intersects[0].point.x );
  console.log( 'y座標=%f', intersects[0].point.y );
  console.log( 'z座標=%f', intersects[0].point.z );
};

const onWindowResize = () => {
  // リサイズされたときにレンダラーとカメラのサイズを更新
  if (mount.value) {
    const rect = mount.value.getBoundingClientRect();
    canvas2d.width = rect.width;
    canvas2d.height = rect.height;
    const x = rect.left;
    const y = rect.top;
    const width = mount.value.offsetWidth;
    const height = mount.value.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    css2drenderer.setSize(width, height);
    console.log(`${x}:${y},${width}:${height}`);
  }
};

const setClearColor = () => {
  if (darkTheme.value) {
    renderer.setClearColor(0x404040); // 暗い灰色に設定
  } else {
    renderer.setClearColor(0xf0f0f0); // 明るい灰色に設定
  }
};
</script>
