import { connect, createReverseTunnel, disconnect, startWebSocket } from './sshTunnel'
import { exec } from 'child_process'
import { resolve } from 'path'

export function ping() {
  console.log('pong')
}

export async function connectSSH() {
  await connect()
}

export function connectSSHTunnel(remotePort, localPort) {
  createReverseTunnel(remotePort, localPort)
}

export async function connectSSHWebSocket(webSocketPort, vncPort) {
  await startWebSocket(webSocketPort, vncPort)
}

export function disconnectSSH() {
  disconnect()
}

export async function supportRemote(remotePortVnc, localPortVnc, remoteWebSocket) {
  await connectSSH()
  await connectSSHTunnel(remotePortVnc, localPortVnc)
  await connectSSHWebSocket(remoteWebSocket, remotePortVnc)
}

export async function installTightVNC() {
  const installerPath = resolve(__dirname, '../../public', 'tightvnc.msi')
  // const configPath = resolve(__dirname, '../../public', 'tightvnc_reg.reg')

  return new Promise((resolve, reject) => {
    exec(installerPath, ['/S'], (err, stdout) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log(stdout)
        resolve(stdout)
      }
    })
  }).catch((err) => {
    console.log(err)
  })
}
