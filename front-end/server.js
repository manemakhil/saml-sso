import { createServer } from 'node:http';
import fs from 'fs/promises';

const htmlFile = await fs.readFile('./public/index.html');
const appJSFile = await fs.readFile('./public/app.js');
const styleCSSFile = await fs.readFile('./public/styles.css');

const server = createServer();

server.on(
    'request',
    async (req, res) => {
        const fullURLObj = new URL(`http://localhost${req.url}`),
            pathname = fullURLObj.pathname;

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

server.listen(3000, 'localhost', () => console.log('Listening on: http://localhost:3000'));