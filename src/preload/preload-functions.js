import { connect, createReverseTunnel, disconnect } from './sshTunnel'
import { execFile } from 'child_process'
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

export function disconnectSSH() {
  disconnect()
}

export async function installTightVNC() {
  const installerPath = resolve(__dirname, '../../public', 'tightvnc.msi')
  const configPath = resolve(__dirname, '../../public', 'tightvnc_reg.reg')

  return new Promise((resolve, reject) => {
    execFile(installerPath, ['/S'], (err, stdout) => {
      if (err) {
        reject(err)
      } else {
        resolve(stdout)
      }
    })
  })
    .then(() => {
      return new Promise((resolve, reject) => {
        execFile('reg', ['import', configPath], (err, stdout) => {
          if (err) {
            reject(err)
          } else {
            resolve(stdout)
          }
        })
      })
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        execFile('net', ['start', 'tvnserver'], (err, stdout) => {
          if (err) {
            reject(err)
          } else {
            resolve(stdout)
          }
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
