const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        }
    })
    // win.loadURL('https://github.com')
  
    // win.loadFile('collections.html')
    win.loadFile('index.html')
  }

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()


app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
    }
  })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
}
})

