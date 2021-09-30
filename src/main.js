const { app, BrowserWindow } = require('electron');
const ytdl = require('ytdl-core')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('app/index.html');
    win.webContents.openDevTools();
}

app.setName('YouTube Audio Player');

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });b
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});
