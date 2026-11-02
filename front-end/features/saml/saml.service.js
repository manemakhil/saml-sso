import jwt from 'jsonwebtoken';
import { SAML } from '@node-saml/node-saml';
import { JWT_SECRET } from '../../../data/auth.js';

class SamlService {
    static samlEngineInit() {
        const {
            AUTH0_AUDIENCE: audience,
            AUTH0_LOGIN: entryPoint,
            AUTH0_ISSUER: issuer,
            AUTH0_CALLBACK: callbackUrl,
            AUTH0_IDP_CERT: idpCert,
            AUTH0_CLOCK_SKEW_MS: acceptedClockSkewMs
        } = process.env;

        this.samlEngine = new SAML({
            audience,
            entryPoint,
            issuer,
            callbackUrl,
            idpCert,
            acceptedClockSkewMs,
            wantAuthnResponseSigned: true,
            wantAssertionsSigned: false
        });
    }

    static async getAuth0LoginUrl() {
        const auth0LoginUrl = await SamlService.samlEngine.getAuthorizeUrlAsync({
            AutAuthnBinding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
        })

        return auth0LoginUrl;
    }

    static async getJWTTokenAfterSamlCallback(parsedBody) {
        try {
            const { profile } = await SamlService.samlEngine.validatePostResponseAsync(parsedBody);

            const userEmail = profile.nameID;

            const internalAccessToken = jwt.sign(
                { email: userEmail },
                JWT_SECRET,
                { expiresIn: '15m' }
            );

            return internalAccessToken;
        }
        catch (err) {
            throw err;
        }
    }
}

export default SamlService;