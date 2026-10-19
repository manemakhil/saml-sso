export const notFound = (res) => {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    return res.end('Not Found');
}