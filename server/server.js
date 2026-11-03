import { createServer } from 'node:https';
import fs from 'fs/promises';

import routeSwitcher from './routes/routes.js';
import { SamlService } from './service/samlService.js';
import { backEndURL, base, port } from './utils/routeUtil.js';



// Initializing dependencies
SamlService.samlEngineInit();

// Loading certs
const options = {
    key: await fs.readFile('../data/private-key.pem'),
    cert: await fs.readFile('../data/certificate.pem')
}

const server = createServer(options);

server.on(
    'request',
    async (req, res) => {
        const fullURLObject = new URL(`${backEndURL}${req.url}`);

        req.fullURLObject = fullURLObject;

        await routeSwitcher(req, res);
    }
);

server.listen(port, base, () => console.log(`Listening on: ${backEndURL}`));