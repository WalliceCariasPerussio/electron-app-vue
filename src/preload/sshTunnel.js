import { Client } from 'ssh2'
import net from 'net'

const remoteServer = {
  host: import.meta.env.PRELOAD_VITE_SSH_HOST,
  port: import.meta.env.PRELOAD_VITE_SSH_PORT,
  username: import.meta.env.PRELOAD_VITE_SSH_USERNAME,
  password: import.meta.env.PRELOAD_VITE_SSH_PASSWORD
}

const sshTunnel = {
  sshClient: null,
};

export function connect() {
  sshTunnel.sshClient = new Client()
  return new Promise((resolve, reject) => {
    sshTunnel.sshClient
      .on('ready', () => {
        console.log('Cliente conectado com sucesso!')
        resolve()
      })
      .on('error', (err) => {
        console.error('Erro na conexão SSH:', err)
        reject(err)
      })
      .connect(remoteServer)
  })
}

export function createReverseTunnel(remotePort, localPort) {
  const localHost = '127.0.0.1'
  console.log(
    `Criando túnel reverso entre a porta remota ${remotePort} e a porta local ${localPort}...`
  )

  sshTunnel.sshClient.forwardIn('0.0.0.0', remotePort, (err) => {
    if (err) {
      console.error('Erro ao criar túnel reverso:', err)
      return
    }

    console.log(
      `Túnel reverso criado com sucesso! A porta remota ${remotePort} está encaminhada para ${localHost}:${localPort}.`
    )
  })

  sshTunnel.sshClient.on('tcp connection', (info, accept) => {
    const srcSocket = accept()
    const dstSocket = new net.Socket()

    dstSocket.on('error', (err) => {
      console.error(`Erro ao conectar-se ao localhost:${localPort}:`, err)
      srcSocket.end()
    })

    dstSocket.connect(localPort, localHost, () => {
      srcSocket.pipe(dstSocket).pipe(srcSocket)
    })
  })
}

export function disconnect() {
  if (sshTunnel.sshClient) {
    sshTunnel.sshClient.end()
    console.log('Cliente desconectado com sucesso!');
  }else{
    console.log('Cliente não conectado!');
  }
}
