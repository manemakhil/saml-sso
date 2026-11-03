import { createServer } from 'node:https';
import fs from 'fs/promises';

import featureRouteSwitcher from './core/http/feature.routes.js';
import FePagesService from './features/fePages/fePages.service.js';
import SamlService from './features/saml/saml.service.js';

// Initialisations
await FePagesService.loadPagesIntoCache();
SamlService.samlEngineInit();

// Start the http server
const { FE_BASE, FE_PORT, FE_URL } = process.env;

// Loading certs
const options = {
    key: await fs.readFile('../data/private-key.pem'),
    cert: await fs.readFile('../data/certificate.pem')
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