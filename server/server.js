import { createServer } from 'node:http';

import routeSwitcher from './routes/routes.js';
import { SamlService } from './service/samlService.js';
import { backEndURL, base, port } from './utils/routeUtil.js';

const server = createServer();

// Initializing dependencies
SamlService.samlEngineInit();

server.on(
    'request',
    async (req, res) => {
        const fullURLObject = new URL(`${backEndURL}${req.url}`);

        req.fullURLObject = fullURLObject;

        await routeSwitcher(req, res);
    }
);

server.listen(port, base, () => console.log(`Listening on: ${backEndURL}`));