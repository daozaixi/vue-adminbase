<script setup></script>

<template>
  <router-view></router-view>
</template>

<style>
  /* 重置默认样式 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  #app {
    height: 100vh;
    width: 100vw;
  }
</style>
