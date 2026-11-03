import { readStreamingSAMLPOSTBody } from "../../../server/utils/requestUtils.js";
import SamlService from "./saml.service.js";

export async function samlLogin(req, res) {
    const auth0LoginUrl = await SamlService.getAuth0LoginUrl();

    res.writeHead(302, { 'Location': auth0LoginUrl });
    return res.end();
}

export async function samlCallback(req, res) {
    try {
        const parsedBody = await readStreamingSAMLPOSTBody(req);

        const internalJwtToken = await SamlService.getJWTTokenAfterSamlCallback(parsedBody);

        const { FE_URL } = process.env
        res.writeHead(
            302,
            {
                'Set-Cookie': `session_token=${internalJwtToken}; Path=/; SameSite=None; Secure; httpOnly`,
                'Location': FE_URL
            }
        );

        return res.end();
    } catch (err) {
    res.writeHead(401, { 'Content-Type': 'text/plain' });
        return res.end(`SAML Verification Failed: ${err.message}`);
    }
}