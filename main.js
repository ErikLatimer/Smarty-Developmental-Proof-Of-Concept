var Electron = require ('electron');

function createWindow() {
    window = new Electron.BrowserWindow({width: 800, height: 600});
    window.loadFile("index.html");
}

Electron.app.on('ready',createWindow);

//I eventually want a login window for this. But for right now, I'm just gonna focus on the main screen after login. That is what the current index.html is going to focus on.