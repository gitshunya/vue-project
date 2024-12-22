<template>
  <canvas ref="babylonCanvas" id="babylon-canvas" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as BABYLON from "@babylonjs/core";

export default defineComponent({
  name: "App",
  setup() {
    const babylonCanvas = ref<HTMLCanvasElement | null>(null);
    const box = ref<BABYLON.Mesh | null>(null); // box を ref で保持

    onMounted(() => {
      if (!babylonCanvas.value) return;

      // 1. Babylon.jsエンジンの作成
      const engine = new BABYLON.Engine(babylonCanvas.value, true);

      // 2. シーンの作成
      const scene = new BABYLON.Scene(engine);

      // 3. カメラの作成と設定
      const camera = new BABYLON.FreeCamera(
        "camera1",
        new BABYLON.Vector3(0, 5, -10),
        scene
      );
      camera.setTarget(BABYLON.Vector3.Zero());

      // 4. カメラの制御をアタッチ
      camera.attachControl(babylonCanvas.value, true);

      // 5. キーボードイベントの監視
      scene.onKeyboardObservable.add((kbInfo) => {
        if (!box.value) return; // box が null の場合は処理を中断

        switch (kbInfo.type) {
          case BABYLON.KeyboardEventTypes.KEYDOWN:
            console.log("KEY DOWN: ", kbInfo.event.key);
            switch (kbInfo.event.key) {
              case "w":
                box.value.position.z += 0.5;
                break;
              case "s":
                box.value.position.z -= 0.5;
                break;
              case "a":
                box.value.position.x -= 0.5;
                break;
              case "d":
                box.value.position.x += 0.5;
                break;
            }
            break;
          case BABYLON.KeyboardEventTypes.KEYUP:
            console.log("KEY UP: ", kbInfo.event.key);
            break;
        }
      });

      // 6. ライトの追加
      const light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );
      light.intensity = 0.7;

      // 7. 立方体の追加
      box.value = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);

      // 8. マテリアルの追加
      const material = new BABYLON.StandardMaterial("boxMaterial", scene);
      material.diffuseColor = new BABYLON.Color3(1, 0, 0); // 赤色
      if (box.value) {
        box.value.material = material;
      }

      // 9. WASDキーでカメラを移動
      camera.keysUp.push(87); // W
      camera.keysDown.push(83); // S
      camera.keysLeft.push(65); // A
      camera.keysRight.push(68); // D

      // 10. 重力と衝突判定を調整
      scene.gravity = new BABYLON.Vector3(0, 0, 0); // 重力を無効化
      camera.checkCollisions = false; // カメラの衝突判定を無効化
      if (box.value) {
        box.value.checkCollisions = true; // 立方体の衝突判定を有効化
      }

      // 11. 地面を作成し、衝突判定を有効化
      const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 10, height: 10 },
        scene
      );
      ground.checkCollisions = true;

      // 12. テクスチャの追加
      const texture = new BABYLON.Texture(
        "https://i.imgur.com/v3u107j.png",
        scene
      );
      material.diffuseTexture = texture;

      // 13. カメラの移動速度を調整
      camera.speed = 0.2;

      // 14. レンダリングループの開始
      engine.runRenderLoop(() => {
        scene.render();
      });
    });

    return { babylonCanvas, box };
  },
});
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
}
#babylon-canvas {
  width: 100vw;
  height: 100vh;
}
</style>
