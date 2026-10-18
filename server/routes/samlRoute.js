import { routes } from "../constants/routes.js";
import { notFound } from "../utils/responseUtils.js";

const samlLogin = async (req, res) => {
    console.log('samlLogin');
};

const samlCallback = async (req, res) => {
    console.log('callback');
}

const samlRouteSwitcher = async (req, res) => {
    const { fullURLObject: { pathname: routePath } } = req;

    switch (routePath) {
        case routes.samlLogin: {
            samlLogin(req, res);
            return;
        }

        case routes.samlCallback: {
            samlCallback(req, res);
            return;
        }

        default: notFound();
    }


};

export default samlRouteSwitcher;