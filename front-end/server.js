import { createServer } from 'node:http';
import fs from 'fs/promises';
import baseRouteSwitcher from './routes/base.routes.js';

const htmlFile = await fs.readFile('./public/index.html');
const appJSFile = await fs.readFile('./public/app.js');
const styleCSSFile = await fs.readFile('./public/styles.css');

const server = createServer();
const { FE_BASE, FE_PORT, FE_URL } = process.env;

server.on(
    'request',
    async (req, res) => {
        try {
            await baseRouteSwitcher(req, res);
        } catch (err) {
            console.error(err.message);
        }

        if (pathname === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(htmlFile);
        } else if (pathname === '/app.js') {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            return res.end(appJSFile);
        } else if (pathname === '/styles.css') {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            return res.end(styleCSSFile);
        }
    }
);

server.listen(FE_PORT, FE_BASE, () => console.log(`Listening on: ${FE_URL}`));