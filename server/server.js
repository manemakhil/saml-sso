import { createServer } from 'node:http';

import routeSwitcher from './routes/routes.js';

const server = createServer();

server.on(
    'request',
    async (req, res) => {
        const fullURLObject = new URL(`http://localhost${req.url}`);

        req.fullURLObject = fullURLObject;

        await routeSwitcher(req, res);
    }
);

server.listen(8000, 'localhost', () => console.log('Listening on: http://localhost:8000'));