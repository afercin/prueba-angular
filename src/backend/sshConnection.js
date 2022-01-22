const SSH2Promise = require('ssh2-promise');
require('dotenv').config();
var ssh = null;

var connection = {
    connect: async function(IP){
        ssh = new SSH2Promise({
            host: IP,
            username: process.env.HOSTNAME,
            password: process.env.PASSWORD
        });
        await ssh.connect();
        console.log("Connection stablished!")
    },
    sendCommand: function(command){
        if (ssh == null) throw new "Connection not stablished";
        console.log(`Sending command '${command}'`);
        return ssh.exec(`${command}\n`);
    },    
    close: function(){
        if (ssh != null){
            ssh.close()
            console.log("Connection closed!");
        }
    }
};

module.exports = connection;