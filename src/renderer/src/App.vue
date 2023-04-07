<script setup>
// const ping = () => {
//   window.api.ping()
// }
const connectSSH = async () => {
  await window.api.connectSSH()
  window.api.connectSSHTunnel(5901, 5900)
}

const disconnect = () => {
  window.api.disconnectSSH()
}
</script>

<template>
  <!-- <button @click="ping">Ping</button> -->
  <button @click="connectSSH">Conectar</button>
  <button @click="disconnect">Desconectar</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
