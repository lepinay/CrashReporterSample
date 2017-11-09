const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const path = require('path')
const url = require('url')

let mainWindow

let options = {
    productName: 'CrashReporter Sample',
    companyName: 'World Company',
    submitURL: `https://electron-crash-reporter.appspot.com/5673442888122368/create/`,
    uploadToServer: true,
    extra: {
        packageVersion: app.getVersion(),
        packageName: app.getName(),
        packagePath: app.getAppPath(),
        packageLocale: app.getLocale()
    }

};
electron.crashReporter.start(options);

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600, webPreferences: { sandbox: true, preload: path.join(__dirname, "preload.js") } })
    mainWindow.webContents.openDevTools();

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    mainWindow.webContents.on('crashed', event => {
        console.error(`Window crashed: ${mainWindow.webContents.getURL()}`);
    });
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})



let menu = Menu.buildFromTemplate([{
    label: 'Menu', submenu: [
        {
            label: 'Native Crash', click() {
                process.crash();
            }
        },
        {
            label: 'Create Renderer', click() {
                createWindow();
            }
        }
    ]
}])
Menu.setApplicationMenu(menu)