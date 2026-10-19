import { routes } from '../constants/routes.js'
import authentication from '../middlewares/authentication.js';
import corsMiddleware from '../middlewares/cors.js';
import { notFound } from '../utils/responseUtils.js';
import samlRouteSwitcher from './samlRoute.js';

async function routeSwitcher(req, res) {
    corsMiddleware(req, res);

    const { fullURLObject: { pathname: routePath } } = req;

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    if (routePath.startsWith(routes.samlBaseRoute)) {
        samlRouteSwitcher(req, res);
        return;
    }

    try {
        // Authetenticaion protected area
        authentication(req, res);
    } catch (err) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        return res.end(err.message);
    }

    if (routePath === routes.protectedPathA) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end('Authenticated!');
    }

    notFound(res);
}

export default routeSwitcher;