import fePagesRouteSwitcher from "../../features/fePages/fePages.routes.js";
import samlRouteSwitcher from "../../features/saml/saml.routes.js";
import { pathSwitcher } from "./routes.utils.js";

const featureRoutes = Object.freeze([
    Object.freeze({
        pattern: new URLPattern({ pathname: '/auth/saml{/*}?' }),
        handler: samlRouteSwitcher
    }),
    Object.freeze({
        pattern: new URLPattern({ pathname: '(/(?!auth/*).*)' }),
        handler: fePagesRouteSwitcher
    })
]);

const featureRouteSwitcher = (req, res) => pathSwitcher(featureRoutes, req, res);

export default featureRouteSwitcher;