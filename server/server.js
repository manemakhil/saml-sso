import { createServer } from 'node:http';

import routeSwitcher from './routes/routes.js';
import { SamlService } from './service/samlService.js';

const server = createServer();

// Initializing dependencies
SamlService.samlEngineInit();

server.on(
    'request',
    async (req, res) => {
        const fullURLObject = new URL(`http://localhost${req.url}`);

        req.fullURLObject = fullURLObject;

        await routeSwitcher(req, res);
    }
);

server.listen(8000, 'localhost', () => console.log('Listening on: http://localhost:8000'));