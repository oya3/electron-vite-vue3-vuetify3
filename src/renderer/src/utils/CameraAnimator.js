import * as THREE from 'three';

// カメラ移動制御
class CameraAnimator {
  // カメラ位置
  static rotatePoints = [
    { x: 0, y: 4, z: 7 }, // 回転時のオフセット
    { x: 0, y: 5, z: 0 }, // 回転注視点
  ]
  // カメラ位置
  static movePoints = [
    { x: -7, y: 5, z: 0 }, // point1 屋根
    { x: 7, y: 5, z: 0 }, // point2 柱
    { x: 0, y: 7, z: 7 }, // 回転時のオフセット
  ];
  static midPoint = { x: 0, y: 5, z: 0 }; // 注視点中間用
  // 注目点
  static targetPoints = [
    { x: -2.093, y: 8.291, z: 2.110 }, // point1 屋根
    { x: 1.2558, y: 0.950, z: -0.955 }, // point2 柱
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
      this.action = new MoveAction(
        this.camera, CameraAnimator.movePoints[2], CameraAnimator.movePoints[0], CameraAnimator.targetPoints[0], 3000);
      return;
    } else if (mode == 2) {
      this.action = new MoveAction(
        this.camera, CameraAnimator.movePoints[2], CameraAnimator.movePoints[1], CameraAnimator.targetPoints[1], 3000);
      return;
    }
    // else{
    // }
    this.action = new RotateAction(this.camera, CameraAnimator.rotatePoints[0], CameraAnimator.rotatePoints[1]);
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
  // @param {Object} offset - 注視点からのオフセット
  // @param {Object} target - lookup position
  constructor(camera, offset, target) {
    // offset
    this.camera = camera;
    this.offset = new THREE.Vector3( offset.x, offset.y, offset.z);
    this.cameraLookAtTarget = new THREE.Vector3(target.x, target.y, target.z);
    // this.camera.lookAt(this.cameraLookAtTarget); // 注視点位置
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
  // @param {Object} midPosition - 中間位置
  // @param {Object} endPosition - 終了位置
  // @param {Object} endLookAt - 注視点位置
  // @param {number} duration - アニメーションの期間（ミリ秒）
  constructor(camera, midPosition, endPosition, endLookAt, duration) {
    this.camera = camera;
    this.startPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
    this.midPosition = new THREE.Vector3(midPosition.x, midPosition.y, midPosition.z);
    this.endPosition = new THREE.Vector3(endPosition.x, endPosition.y, endPosition.z);
    this.curve = new THREE.CatmullRomCurve3([
      this.startPosition,
      this.midPosition,
      this.endPosition,
    ]);

    // カメラの向きを取得（これはオイラー角です）
    const cameraDirection = this.camera.getWorldDirection(new THREE.Vector3());
    // 視線の終点を計算（カメラの位置 + カメラの向き）
    this.startLookAt = new THREE.Vector3().addVectors(this.camera.position, cameraDirection);
    // this.midLookAt = new THREE.Vector3(midPosition.x, midPosition.y, midPosition.z);
    this.midLookAt = new THREE.Vector3(CameraAnimator.midPoint.x, CameraAnimator.midPoint.y, CameraAnimator.midPoint.y);
    this.endLookAt = new THREE.Vector3(endLookAt.x, endLookAt.y, endLookAt.z);
    this.curveLookAt = new THREE.CatmullRomCurve3([
      this.startLookAt,
      this.midLookAt,
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
    // const lookAtPosition = new THREE.Vector3().lerpVectors(this.startLookAt, this.endLookAt, this.progress);
    const lookAtPosition = this.curveLookAt.getPoint(this.progress);
    this.camera.position.copy(position);
    this.camera.lookAt(lookAtPosition);
    return this.progress;
  }
}

// export default CameraAnimator;
export { CameraAnimator };
