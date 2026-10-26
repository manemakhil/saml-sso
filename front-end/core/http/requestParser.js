export const readStreamingSamlPostBody = async request => new Promise((resolve, reject) => {
    const samlBody = '';

    request.on('data', chunk => samlBody += chunk.toString());

    request.on('end', () => {
        const params = new URLSearchParams(samlBody);
        const parsedSaml = {};

        for (const [key, value] of params.entries()) { parsedSaml[key] = value; }

        resolve(parsedSaml);
    })
});