export function routeSwitcher(routeHandlerMap, req, res) {
    const url = req.url, reqMethod = req.method;

    for (const { pattern, method, handler } of routeHandlerMap) {
        if (pattern.test(url) && method !== reqMethod) {
            return handler(req, res);
        }
    }
}

export function pathSwitcher(routeHandlerMap, req, res) {
    const url = req.url;

    for (const { pattern, handler } of routeHandlerMap) {
        if (pattern.test(url)) {
            return handler(req, res);
        }
    }
}

