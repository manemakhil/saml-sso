import { createServer } from 'node:https';
import fs from 'fs/promises';

import FePagesService from './features/fePages/fePages.service.js';
import SamlService from './features/saml/saml.service.js';
import featureRouteSwitcher from './infrastructure/https/feature.routes.js';

// Initialisations
await FePagesService.loadPagesIntoCache();
SamlService.samlEngineInit();

// Start the http server
const { FE_BASE, FE_PORT, FE_URL } = process.env;

// Loading certs
const options = {
    key: await fs.readFile('./config/private-key.pem'),
    cert: await fs.readFile('./config/certificate.pem')
}

const server = createServer(options);
server.on(
    'request',
    async (req, res) => {
        try {
            await featureRouteSwitcher(req, res);
        } catch (err) {
            console.error(err.message);
        }
    }
);

server.listen(FE_PORT, FE_BASE, () => console.log(`Listening on: ${FE_URL}`));