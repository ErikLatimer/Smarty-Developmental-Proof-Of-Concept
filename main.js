var Electron = require ('electron');

function createWindow() {
    window = new Electron.BrowserWindow({width: 800, height: 600});
    window.loadFile("index.html");
}

Electron.app.on('ready',createWindow);