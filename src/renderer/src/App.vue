<script setup>
import { ref } from 'vue'
// const ping = () => {
//   window.api.ping()
// }

const connection = ref('Disconnected')
const error = ref('')

const connectSSH = async () => {
  try {
    const remotPortVnc = 5901;
    const localPortVnc = 5900;
    const remotWebSocket = 8080;

    connection.value = 'Connecting'
    await window.api.connectSSH()
    window.api.connectSSHTunnel(remotPortVnc, localPortVnc)
    await window.api.connectSSHWebSocket(remotWebSocket, remotPortVnc)
    connection.value = 'Connected'
  } catch (error) {
    console.error('Erro ao conectar:', error)
    connection.value = 'Disconnected'
    error.value = error
  }
}

const disconnect = () => {
  window.api.disconnectSSH()
  connection.value = 'Disconnected'
}

// const installTightVNC = async () => {
//   try {
//     const result = await window.api.installTightVNC()
//     console.log(result)
//   } catch (error) {
//     console.error('Erro ao instalar o TightVNC:', error)
//   }
// }
</script>

<template>
  <!-- <button @click="ping">Ping</button> -->
  <!-- <div>
    <h1>Instalador do TightVNC</h1>
    <p>Deseja instalar e configurar o TightVNC?</p>
    <button @click="installTightVNC">Instalar TightVNC</button>
  </div>
  <br /><br /> -->
  <button @click="connectSSH" :disabled="connection == 'Connecting' || connection == 'Connected'">
    Conectar
  </button>
  <button @click="disconnect" :disabled="connection == 'Disconnected'">Desconectar</button>
  <p>{{ connection }}</p>
  <p v-if="error">Error: {{ error }}</p>
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
