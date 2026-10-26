import {SAML} from '@node-saml/node-saml';

class SamlService {
    static samlEnginerInit() {
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
}