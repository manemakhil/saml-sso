export function routeSwitcher(routeHandlerMap, req, res) {
     const url = req.url, reqMethod = req.method;
    
        for (const { pattern, method, handler } of routeHandlerMap) {
            if (pattern.test(url)) {
                if (method && method !== reqMethod) continue;
    
                return handler(req, res);
            }
        }
}

