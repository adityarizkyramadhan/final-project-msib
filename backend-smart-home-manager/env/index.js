if (process.env.KUBERNETES != 'TRUE') {
    const debugData = { key: "ENVIRONMENTS" }
    const path = require('path');
    const dotenv = require('dotenv');
    const debug = require('../utils/debug');
    // const envFile = { path: process.env.NODE_ENV?path.resolve(__dirname, `../env/${process.env.NODE_ENV}.env`):path.resolve(__dirname, `../env/.env`)};
    const envFile = { path: path.resolve(__dirname, '../env/.env') };
    const envConfig = dotenv.config(envFile);
    debugData['env path'] = envFile.path;
    debugData['env config'] = envConfig;
    debug.logData(debugData);
}


