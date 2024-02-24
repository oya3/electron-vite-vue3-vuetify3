import * as THREE from 'three';

// カメラ移動制御
class CameraAnimator {
  // カメラ位置
  static rotatePoints = [
    { x: 0, y: 7, z: 7 }, // カメラ位置(回転時のオフセット)
    { x: 0, y: 5, z: 0 }, // 回転注視点
  ]

  static movePoints1 = [
    { x: -6, y: 5, z: 0 }, // カメラ位置 point1 屋根
    { x: -2.093, y: 8.291, z: 2.110 }, // 注視点 point1 屋根
    { x: 0, y: 5, z: 0 }, // 注視点中間用
    // { x: 1.2558, y: 0.950, z: -0.955 }, // 注視点 point2 柱
    // { x: -2.093, y: 8.291, z: 2.110 }, // 注視点 point1 屋根
  ];

  static movePoints2 = [
    { x: 6, y: 5, z: 0 }, // カメラ位置 point2 柱
    { x: 1.2558, y: 0.950 + 2, z: -0.955 }, // 注視点 point2 柱
    { x: 0, y: 5, z: 0 }, // 注視点中間用
    // { x: -2.093, y: 8.291, z: 2.110 }, // 注視点 point1 屋根
    // { x: 1.2558, y: 0.950, z: -0.955 }, // 注視点 point2 柱
  ];

  // CameraAnimatorクラスの新しいインスタンスを作成します。
  // @param {Object} camera - Three.jsのカメラオブジェクト。
  constructor (camera) {
    this.camera = camera; // カメラ位置保持
    this.mode = 0; // 0: 回転, 1: point1移動, 2: point2 移動
    this.action = null; // this.ChangeAction(0);
  }

  // カメラアクションを変更
  // @param {Number} mode - モード
  // @param {Object} params - パラメータ
  changeAction(mode, params) {
    if (mode == 1) {
      this.action = new MoveAction(this.camera, CameraAnimator.movePoints1, 3000);
      return;
    } else if (mode == 2) {
      this.action = new MoveAction(this.camera, CameraAnimator.movePoints2, 3000);
      return;
    }
    this.action = new RotateAction(this.camera, CameraAnimator.rotatePoints);
  }

  // アニメーション実行
  animate(currentTime) {
    this.action.animate(currentTime);
    // this.camera.position.copy(this.action.currentPosition);
    // this.camera.lookAt(this.action.targetPosition);
  }
}

// 回転アクション
class RotateAction {
  // @param {Object} camera - カメラオブジェクト
  // @param {Object} points - 入力座標パラメータ
  constructor(camera, points) {
    // offset
    this.camera = camera;
    this.offset = new THREE.Vector3( points[0].x, points[0].y, points[0].z);
    this.cameraLookAtTarget = new THREE.Vector3(points[1].x, points[1].y, points[1].z);
  }

  // @param {Number} offset_y - lookup potion からのオフセット
  animate(currentTime) {
    // var rad = currentTime;
    // const elapsedTime = this.clock.getElapsedTime();
    const rad = currentTime / 1000; // 秒に変換
    this.camera.position.x = Math.cos(rad * 0.1) * this.offset.z;
    this.camera.position.z = Math.sin(rad * 0.1) * this.offset.z;
    this.camera.position.y = this.offset.y;
    this.camera.lookAt(this.cameraLookAtTarget); // 注視点位置
    return 1; // 移動完了を示す
  }
}

// ２点移動アクション
class MoveAction {
  // @param {Object} camera - カメラ
  // @param {Object} points - 入力座標パラメータ
  // @param {number} duration - アニメーションの期間（ミリ秒）
  constructor(camera, points, duration) {
    // points[0] カメラ位置 point1 屋根
    // points[1] 注視点 point1 屋根
    // points[2] 注視点中間用
    this.camera = camera;
    this.startPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
    this.midPosition = new THREE.Vector3(points[2].x, points[2].y, points[2].z);
    this.endPosition = new THREE.Vector3(points[0].x, points[0].y, points[0].z);
    this.curve = new THREE.CatmullRomCurve3([
      this.startPosition,
      // this.midPosition,
      this.endPosition,
    ]);

    // カメラの向きを取得（これはオイラー角です）
    const cameraDirection = this.camera.getWorldDirection(new THREE.Vector3());
    // 視線の終点を計算（カメラの位置 + カメラの向き）
    this.startLookAt = new THREE.Vector3().addVectors(this.camera.position, cameraDirection);
    // this.midLookAt = new THREE.Vector3(midPosition.x, midPosition.y, midPosition.z);
    this.midLookAt = new THREE.Vector3(points[2].x, points[2].y, points[2].z);
    this.endLookAt = new THREE.Vector3(points[1].x, points[1].y, points[1].z);
    this.curveLookAt = new THREE.CatmullRomCurve3([
      this.startLookAt,
      // this.midLookAt,
      this.endLookAt,
    ]);
    this.duration = duration;
    this.start = null;
    this.progress = 0;
  }

  animate(currentTime) {
    if (this.progress == 1) return this.progress;
    if (!this.start) this.start = currentTime;
    const elapsed = currentTime - this.start;
    this.progress = Math.min(elapsed / this.duration, 1);
    this.progress = this.progress * (2 - this.progress); // easeInOutQuad
    // スプライン曲線上の現在の位置を取得
    const position = this.curve.getPoint(this.progress);
    const lookAtPosition = new THREE.Vector3().lerpVectors(this.startLookAt, this.endLookAt, this.progress);
    // const lookAtPosition = this.curveLookAt.getPoint(this.progress);
    this.camera.position.copy(position);
    this.camera.lookAt(lookAtPosition);
    return this.progress;
  }
}

// export default CameraAnimator;
export { CameraAnimator };
