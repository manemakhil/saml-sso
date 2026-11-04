import { createServer } from 'node:https';
import fs from 'fs/promises';

import featureRouteSwitcher from './infrastructure/https/feature.routes.js';

// Loading certs
const options = {
    key: await fs.readFile('./config/private-key.pem'),
    cert: await fs.readFile('./config/certificate.pem')
}

const {
    BE_BASE: base,
    BE_PORT: port,
    BE_URL: beURL
} = process.env;

const server = createServer(options);

server.on(
    'request',
    async (req, res) => {
        await featureRouteSwitcher(req, res);
    }
);

server.listen(port, base, () => console.info(`Listening on: ${beURL}`));