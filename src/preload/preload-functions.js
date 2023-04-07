import {connect, createReverseTunnel, disconnect} from './sshTunnel'

export function ping() {
  console.log('pong sdasdas')
}

export async function connectSSH() {
  await connect()
}

export function connectSSHTunnel(remotePort, localPort) {
  createReverseTunnel(remotePort, localPort)
}

export function disconnectSSH() {
  disconnect()
}


