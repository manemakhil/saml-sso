export const readStreamingSAMLPOSTBody = async (req) => new Promise((resolve, reject) => {
    let reqBodyData = '';

    req.on('data', (data) => reqBodyData += data.toString());

    req.on('end', () => {
        const params = new URLSearchParams(reqBodyData);
        const parsed = {};

        for (const [key, value] of params.entries()) { parsed[key] = value; }

        resolve(parsed);
    });
});