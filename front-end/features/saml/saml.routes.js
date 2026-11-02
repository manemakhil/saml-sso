import { routeSwitcher } from "../../core/http/routes.utils.js";
import { samlCallback, samlLogin } from "./saml.controller.js";

const samlRoutes = Object.freeze([
    {
        route: new URLPattern({ pathname: '/auth/saml/login' }),
        method: 'GET',
        handler: samlLogin
    },
    {
        method: new URLPattern({ pathname: '/auth/saml/callback' }),
        method: 'POST',
        handler: samlCallback
    }
]);

const samlRouteSwitcher = (req, res) => routeSwitcher(samlRoutes, req, res);

export default samlRouteSwitcher;