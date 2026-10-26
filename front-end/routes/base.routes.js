import { frontEndUrl } from "../../data/localConfig.js";
import { routes } from "../constants/routes.js";

async function baseRouteSwitcher(req, res) {
    const fullURLObj = new URL(`${frontEndUrl}${req.url}`),
        pathname = fullURLObj.pathname;

    req.fullURLObj = fullURLObj;

    if (pathname === routes.samlBaseRoute) {

    }
}

export default baseRouteSwitcher;