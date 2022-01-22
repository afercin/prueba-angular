import SSH2Promise from "ssh2-promise"
import { SshConf } from "./ssh.conf";

export class SshConnection {
  ssh: SSH2Promise | undefined;
  constructor() {
    this.ssh = undefined;
  }

  connect = async (ip: string) => {
    var sshconfig = {
      host: '10.0.0.1',
      username: 'root',
      password: 'patata123'
    }
    this.ssh = new SSH2Promise(sshconfig);
    await this.ssh.connect()
    console.log("Connection stablished!")
  }

  sendCommand = async (command: string) => {
    if (this.ssh) {
      console.log(`Sending \`${command}\´`);
      return await this.ssh.exec(`${command}\n`);
    }
    return "Connection not stablished";
  }

  close = async () => {
    if (this.ssh) {
      await this.ssh.close()
      console.log("Connection closed")
    }
  }
}