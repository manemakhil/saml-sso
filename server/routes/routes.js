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

    // Authetenticaion protected area
    return authentication(req, res);

    if (routePath === routes.protectedPathA) {

    } else if (routePath === routes.protectedPathB) {

    }

    notFound(res);
}

export default routeSwitcher;