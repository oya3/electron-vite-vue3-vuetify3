<template>
  <div ref="mount" style="width: 100%; height: 100%;"/>
</template>

<script>
import * as THREE from 'three';
import { inject } from 'vue';

export default {
  name: 'ThreeJsComponent',
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
        if(this.renderer){  // renderer が生成されてないと背景色を設定できない
          this.setClearColor();
        }
        console.log('darkTheme.value:', newValue);
      }
    }
  },
  mounted() {
    this.header_size = 64;  // header 分減算用
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
    const size = 10;
    const divisions = 10;
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

    // カメラ位置
    this.camera.position.z = 5;
    this.camera.position.y = 3;

    const animate = () => {
      requestAnimationFrame(animate);

      // キューブの周りをカメラが回るようにする
      const elapsedTime = this.clock.getElapsedTime();
      this.camera.position.x = Math.cos(elapsedTime * 0.1) * 5;
      this.camera.position.z = Math.sin(elapsedTime * 0.1) * 5;
      this.camera.lookAt(this.cube.position);

      this.renderer.render(this.scene, this.camera);
    };

    animate();

    // リサイズイベントのリスナーを追加
    window.addEventListener('resize', this.onWindowResize, false);
  },
  beforeDestroy() {
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
    onWindowResize() {
      // ブラウザウィンドウがリサイズされたときにレンダラーとカメラのサイズを更新
      this.camera.aspect = window.innerWidth / (window.innerHeight - this.header_size);
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, (window.innerHeight - this.header_size));
    },
    setClearColor() {
      if(this.darkTheme){
        this.renderer.setClearColor(0x404040); // 暗い灰色に設定
      }
      else{
        this.renderer.setClearColor(0xf0f0f0); // 明るい灰色に設定
      }
    },
  },
};
</script>
