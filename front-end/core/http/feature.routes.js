import fePagesRouteSwitcher from "../../features/fePages/fePages.routes.js";
import samlRouteSwitcher from "../../features/saml/saml.routes.js";
import { routeSwitcher } from "./routes.utils.js";

export const featureRoutes = Object.freeze([
    {
        pattern: new URLPattern({ pathname: '/auth/saml{/*}?' }),
        handler: samlRouteSwitcher
    },
    {
        pattern: new URLPattern({ pathname: '(/(?!auth/*).*)' }),
        handler: fePagesRouteSwitcher
    }
]);

const featureRouteSwitcher = (req, res) => routeSwitcher(featureRoutes, req, res);

export default featureRouteSwitcher;