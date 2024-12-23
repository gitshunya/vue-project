<template>
  <div>
    <button @click="accel">加速</button>
    <button @click="decel">減速</button>
    <button @click="rotateLeft">左回転</button>
    <button @click="rotateRight">右回転</button>
    <canvas id="renderCanvas" style="width: 100%; height: 100%"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
} from "@babylonjs/core";

let camera: ArcRotateCamera; // グローバル変数として宣言

onMounted(() => {
  const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);

  camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    10,
    new Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);

  new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  MeshBuilder.CreateBox("box", { size: 2 }, scene);

  engine.runRenderLoop(() => {
    scene.render();
  });
});

const accel = () => {
  // 加速処理
  camera.radius -= 0.1;
};

const decel = () => {
  // 減速処理
  camera.radius += 0.1;
};

const rotateLeft = () => {
  // 左回転処理
  camera.alpha -= 0.1;
};

const rotateRight = () => {
  // 右回転処理
  camera.alpha += 0.1;
};
</script>
