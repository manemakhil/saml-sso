import { routes } from '../constants/routes.js'
import { notFound } from '../utils/responseUtils.js';
import samlRouteSwitcher from './samlRoute.js';

async function routeSwitcher(req, res) {
    const { fullURLObject: { pathname: routePath } } = req;

    if (routePath.startsWith(routes.samlBaseRoute)) {
        samlRouteSwitcher(req, res);
        return;
    }

    notFound(res);
}

export default routeSwitcher;