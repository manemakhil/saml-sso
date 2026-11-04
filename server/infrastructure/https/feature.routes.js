import { authentication } from "./authentication.middleware.js";
import { cors } from "./cors.middleware.js";
import { pathSwitcher } from "./routes.utils.js";

const featureRoutes = Object.freeze([
    Object.freeze({
        pattern: new URLPattern({ pathname: '/protectedA' }),
        handler: (req, res) => { res.end('hi'); }
    }),
    Object.freeze({
        pattern: new URLPattern({ pathname: '/protectedB' }),
        handler: (req, res) => { res.end('hi'); }
    })
]);

const featureRouteSwitcher = (req, res) => {
    try {
        cors(req, res);

        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            return res.end();
        }

        authentication(req, res);

        return pathSwitcher(featureRoutes, req, res);
    } catch (err) {
        return res.end();
    }
};

export default featureRouteSwitcher;