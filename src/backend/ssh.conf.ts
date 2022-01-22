export class SshConf {
    username: string;
    password: string;

    constructor(public host: string){
        this.username = "root"
        this.password = "patata123"
    }
}