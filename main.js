const { app, ipcMain, BrowserWindow } = require("electron");
const conn = require('./src/backend/sshConnection.js');

let appWin;

createWindow = async () => {

    await conn.connect("10.0.0.1");

    appWin = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Angular and Electron",
        resizable: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    
    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null);

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}


ipcMain.on("message", async (event, arg) =>{
    switch(arg){
        case "WD": 
            event.reply("reply", await conn.sendCommand("ls -la /home/crossgame")); 
            break;
        default:
            event.reply("reply", "Unsupported option"); 
    }
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
    conn.close();
});