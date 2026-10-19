const corsMiddleware = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
}

export default corsMiddleware;