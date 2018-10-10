const electron = require('electron')
let options = {
    productName: 'CrashReporter Sample',
    companyName: 'World Company',
    submitURL: `xxx`
};
electron.crashReporter.start(options);
window.crash = process.crash;