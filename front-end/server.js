import { createServer } from 'node:http';

import featureRouteSwitcher from './core/http/feature.routes.js';
import FePagesService from './features/fePages/fePages.service.js';
import SamlService from './features/saml/saml.service.js';

// Initialisations
await FePagesService.loadPagesIntoCache();
SamlService.samlEngineInit();

// Start the http server
const { FE_BASE, FE_PORT, FE_URL } = process.env;

const server = createServer();
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