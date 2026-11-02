import fs from 'fs/promises';

class FePagesService {
    static #htmlFile
    static #appJsFile
    static #styleCssFile

    static async loadPagesIntoCache() {
        this.#htmlFile = await fs.readFile('./public/index.html');
        this.#appJsFile = await fs.readFile('./public/app.js');
        this.#styleCssFile = await fs.readFile('./public/styles.css');
    }

    static get htmlFile() {
        return this.#htmlFile;
    }

    static get jsFile() {
        return this.#appJsFile;
    }

    static get styleCssFile() {
        return this.#styleCssFile
    }
}

export default FePagesService;