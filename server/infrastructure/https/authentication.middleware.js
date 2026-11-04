import { jwtAuthentication } from "../security/jwt.service.js";

export function authentication(req, res) {
    try {
        const decoded = jwtAuthentication(req.headers['cookie']);

        return decoded;
    } catch (err) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.write(err.message);
        throw err;
    }
}