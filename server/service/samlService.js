import { SAML } from '@node-saml/node-saml';
import { auth0Config } from '../../data/auth.js';

export class SamlService {

    static samlEngineInit() {
        this.samlEngine = new SAML({
            audience: auth0Config.audience,
            entryPoint: auth0Config.loginURL,
            issuer: auth0Config.issuer,
            callbackUrl: auth0Config.callBackUrl,
            idpCert: auth0Config.idpCert,
            acceptedClockSkewMs: auth0Config.clockSkewMs,
            wantAuthnResponseSigned: true,
            wantAssertionsSigned: false
        })
    }
}