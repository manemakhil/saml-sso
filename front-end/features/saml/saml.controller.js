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

        const internalJwtToken = SamlService.getJWTTokenAfterSamlCallback(parsedBody);

        res.writeHead(
            302,
            {
                'Set-Cookie': `session_token=${internalJwtToken}; Path=/; SameSite=Lax; httpOnly`,
                'Location': frontEndURL
            }
        );

        return res.end();
    } catch (err) {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        return res.end(`SAML Verification Failed: ${err.message}`);
    }
}