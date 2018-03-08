const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const {shell} = require('electron')
const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({ 
      width: 935,
      height: 849,
      frame: false,
      backgroundColor: '#00FFFFFF',
      transparent: true,
      resizable: false
    })

    // mainWindow.loadURL('http://web.7k7k.com/games/test/170908/electron/')
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    mainWindow.on('closed', function() {
        mainWindow = null
    })
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('main-process-messages', 'webContents event "did-finish-load" called');
    })
}

app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})
electron.ipcMain.on('window-close', () => {
    mainWindow.close();
});

electron.ipcMain.on('window-min', () => {
    mainWindow.minimize();
});

electron.ipcMain.on('loadurl-message', (event, arg) => {
    shell.openExternal(arg);
});