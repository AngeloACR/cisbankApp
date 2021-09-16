const db = require('./database');
const localServer = require('./localServer');



const localPort = 3400;
const localFolder = './public/cisbankApp';
const localPath = localFolder + '/index.html';
const localApp = localServer.init(localFolder, localPath, localPort);

const connection = db.initConnect();

localApp.listen(localPort, () => {
    console.log('Server running at: ' + localPort);
});