import jwt from 'jsonwebtoken';

import { routes } from "../constants/routes.js";
import { SamlService } from "../service/samlService.js";
import { readStreamingSAMLPOSTBody } from "../utils/requestUtils.js";
import { notFound } from "../utils/responseUtils.js";
import { JWT_SECRET } from '../../data/auth.js';

const samlLogin = async (req, res) => {
    if (req.method === 'GET') {
        const auth0LoginURL = await SamlService.samlEngine.getAuthorizeUrlAsync({
            AutAuthnBinding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
        });

        res.writeHead(302, { 'Location': auth0LoginURL });
        return res.end();
    }
};

const samlCallback = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const parsedBody = await readStreamingSAMLPOSTBody(req);

            // Pass the incoming payload directly to node-saml to run cryptographic validation checks
            const { profile } = await SamlService.samlEngine.validatePostResponseAsync(parsedBody);

            console.log(profile);

            const userEmail = profile.nameID;

            // Generate your internal applications JWT signed with your imported private master key
            const internalAccessToken = jwt.sign(
                { email: userEmail },
                JWT_SECRET,
                { expiresIn: '15m' }
            );

            // Bounce the user back to the web portal app UI with the identity token pinned
            res.writeHead(302, { 'Location': `http://localhost:3000?token=${internalAccessToken}` });
            return res.end();
        } catch (err) {
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            return res.end(`SAML Verification Failed: ${err.message}`);
        }
    }

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