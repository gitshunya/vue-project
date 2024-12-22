<template>
  <canvas id="renderCanvas"></canvas>
</template>

<script setup lang="ts">
// Babylon.js のコア機能と GUI 機能をインポート
import {
  Engine,
  Scene,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  ArcRotateCamera,
  Color3,
} from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";
import { onMounted } from "vue";

onMounted(() => {
  // Canvas 要素を取得
  const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

  // Babylon.js の Engine を作成
  const engine = new Engine(canvas, true);

  // Babylon.js の Scene を作成
  const scene = new Scene(engine);

  // シーンの背景色を黒に設定
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

  // カメラを作成 (ArcRotateCamera)
  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    5,
    new Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);

  // ライトを作成 (HemisphericLight)
  const light = new HemisphericLight(
    "light",
    new Vector3(0, 1, 0),
    scene,
    new Color3(1, 1, 1)
  );
  light.intensity = 1;

  // オブジェクトを作成 (球体)
  const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);

  // GUI を作成 (AdvancedDynamicTexture)
  const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

  // テキストを作成 (TextBlock)
  const text1 = new TextBlock();
  text1.text = "Hello world";
  text1.color = "white";
  text1.fontSize = 48;
  advancedTexture.addControl(text1);

  // レンダリングループを設定
  engine.runRenderLoop(() => {
    scene.render();
  });
});
</script>
