const corsMiddleware = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:4000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
}

export default corsMiddleware;