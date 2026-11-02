import FePagesService from "./fePages.service.js";

export async function sendHtmlFile(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(FePagesService.htmlFile);
}

export async function sendAppJsFile(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    return res.end(FePagesService.jsFile);
}

export async function sendStyleCssFile(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    return res.end(FePagesService.styleCssFile);
}