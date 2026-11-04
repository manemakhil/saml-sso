export function pathSwitcher(routeHandlerMap, req, res) {
    const url = req.url;

    for (const { pattern, handler } of routeHandlerMap) {
        if (pattern.test(url)) {
            return handler(req, res);
        }
    }
}
