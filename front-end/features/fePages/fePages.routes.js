import { routeSwitcher } from "../../infrastructure/https/routes.utils.js";
import { sendAppJsFile, sendHtmlFile, sendStyleCssFile } from "./fePages.controller.js";

export const fePagesRoutes = Object.freeze([
    {
        pattern: new URLPattern({ pathname: '/' }),
        method: 'GET',
        handler: sendHtmlFile
    },
    {
        pattern: new URLPattern({ pathname: '/app.js' }),
        method: 'GET',
        handler: sendAppJsFile
    },
    {
        pattern: new URLPattern({ pathname: '/styles.css' }),
        method: 'GET',
        handler: sendStyleCssFile
    }
]);

const fePagesRouteSwitcher = (req, res) => routeSwitcher(fePagesRoutes, req, res);

export default fePagesRouteSwitcher;