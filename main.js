'use strict' // this is necessary for using const and let

// dependencies
const electron = require('electron')

// electron
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const PLATFORM = process.platform

// this one gets to be global because we NEVER want it to be garbage-collected
let mainWindow

function createWindow () {
  let menu
    
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL('file://' + __dirname + '/app/index.html')
  mainWindow.on('closed', function() {
    mainWindow = null
  })

  switch (PLATFORM) {
    case 'darwin':
      menu = Menu.buildFromTemplate([{
          label: 'Feldman',
          submenu: [{
            click() { /* ... */ },
            label: 'About Feldman'
          }, {
            accelerator: 'Command+Q',
            click() { app.quit() },
            label: 'Quit'
          }]
        }, {
          label: 'Develop',
          submenu: [{
            accelerator: 'Alt+Command+I',
            click() { mainWindow.webContents.openDevTools() },
            label: 'Show Web Inspector'
          }]
        }])
      Menu.setApplicationMenu(menu)
      break
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  // Non-darwin systems traditionally quit when all the windows are closed
  if (PLATFORM !== 'darwin') app.quit()
});

app.on('activate', function () {
  // Drawin systems traditionally create a window when the dock icon is clicked and none exist
  if (PLATFORM === 'darwin' && mainWindow === null) createWindow()
});
