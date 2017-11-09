const electron = require('electron')
let options = {
    productName: 'CrashReporter Sample',
    companyName: 'World Company',
    submitURL: `https://electron-crash-reporter.appspot.com/5673442888122368/create/`
};
electron.crashReporter.start(options);
window.crash = process.crash;