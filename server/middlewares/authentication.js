import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../data/auth.js';

const authentication = (req, res) => {
    const authToken = req.headers['authorization'];

    if (!authToken || !authToken.startsWith('Bearer ')) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Access Denied: Missing or Malformed Bearer Token' }));
    }

    const token = authToken.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        console.log('Authentication successful: ', decoded);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            status: 'success',
            message: 'Hello from the secure microservice engine payload!',
            authenticatedUser: decoded.email // Sending back user info from the verified token
        }));

    } catch (err) {
        let errorMessage = 'Invalid Token Signature';
        if (err.name === 'TokenExpiredError') {
            errorMessage = 'Token has expired. Please refresh your session.';
        }

        console.error(`JWT Verification Failed: ${err.message}`);

        res.writeHead(403, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: errorMessage }));
    }
};

export default authentication;