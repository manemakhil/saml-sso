import jwt from 'jsonwebtoken';

const {
    JWT_SECRET
} = process.env;

export function jwtAuthentication(cookie) {
    if (cookie !== undefined) {
        const cookieMap = new Map(cookie.split(/;\s*/).map(c => c.split(/=(.*)/s)));

        const token = cookieMap.get('session_token') ?? cookieMap.get('authorisation');

        const decoded = jwt.verify(token, JWT_SECRET);

        return decoded;
    }

    throw new Error('Cookie not present');
}