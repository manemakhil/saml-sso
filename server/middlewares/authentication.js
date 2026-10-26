import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../data/auth.js';

const authentication = (req, res) => {
    let token = req.headers['cookie'];

    if (token === undefined) {
        let authToken = req.headers['authorization'];
        if (!authToken || !authToken.startsWith('Bearer ')) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Access Denied: Missing or Malformed Bearer Token' }));

            throw new Error('Access Denied: Missing or Malformed Bearer Token');
        }

        token = authToken.split(' ')[1];
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        console.log('Authentication successful: ', decoded);

    } catch (err) {
        let errorMessage = 'Issue with Token';
        if (err.name === 'TokenExpiredError') {
            errorMessage = 'Token has expired. Please refresh your session.';
        }

        console.error(`JWT Verification Failed: ${err.message}`);

        throw new Error(errorMessage);
    }
};

export default authentication;