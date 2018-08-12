"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const svgicons2svgfont = require("svgicons2svgfont");
const tools_1 = require("./tools");
class Converter {
    /**
     *
     */
    constructor(config) {
        this.config = config;
        this.tools = new tools_1.Tools;
        this.fontStream = svgicons2svgfont({ fontName: config.fontName });
    }
    /**
     * Initialise
     */
    convert(icons) {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.openSvgStream().then(() => {
                this.addSvgsToMap(icons);
            });
        });
    }
    /**
     *
     */
    openSvgStream() {
        //
        this.tools.prepareFile({
            path: this.tools.formatDirName(this.config.outPath),
            name: this.tools.formatFileName(this.config.fileName),
            extension: 'svg'
        }, 'SVG font file');
        return new Promise((resolve, reject) => {
            this.fontStream
                .pipe(fs.createWriteStream(this.tools.locateFile(this.config.outPath, this.config.fileName, '.svg')))
                .on('finish', () => {
                this.tools.log('SVG Map created');
            })
                .on('error', (err) => {
                console.log(err);
            });
            resolve();
        });
    }
    /**
     *
     */
    addSvgsToMap(icons) {
        icons.forEach((icon) => {
            this.addSingleSvgToMap(icon);
        });
        this.fontStream.end();
        this.resolve();
    }
    /**
     *
     */
    addSingleSvgToMap(icon) {
        // Read the svg
        const glyph = fs.createReadStream(icon.path);
        // Set the icon meta
        glyph['metadata'] = {
            unicode: [icon.char],
            name: icon.name
        };
        // Write the icon character
        this.fontStream.write(glyph);
    }
}
exports.Converter = Converter;
//# sourceMappingURL=converter.js.map