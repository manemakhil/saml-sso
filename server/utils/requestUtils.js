export const readStreamingBody = async (req) => new Promise((resolve, reject) => {
    let reqBodyData = '';

    req.on('data', (data) => {
        reqBodyData += data;
    });

    req.on('end', () => resolve(reqBodyData));
});