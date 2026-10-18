export const notFound = (res) => {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
}