import * as fs from 'fs';
import * as svgicons2svgfont from 'svgicons2svgfont';
import * as fonteditorcore from 'fonteditor-core';
import * as svg2ttf from 'svg2ttf';

import { IConfig, IconObject } from './interfaces';
import { Tools } from './tools';

export class Converter {

    // Tools Class
    private tools: Tools;
    // Font converter
    private fontStream: any;
    // Promise resolver
    private resolve: Function;

    /**
     *
     */
    constructor (private config: IConfig) {
        this.tools = new Tools;
        this.fontStream = svgicons2svgfont({fontName: config.fontName});
    }

    /**
     * Initialise
     */
    convert (icons: IconObject[]) {
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
    openSvgStream () {
        //
        this.tools.prepareFile({
            path: this.tools.formatDirName(this.config.outPath),
            name: this.tools.formatFileName(this.config.fileName),
            extension: 'svg'
        }, 'SVG font file');

        return new Promise((resolve, reject) => {
            this.fontStream
                .pipe(
                    fs.createWriteStream(
                        this.tools.locateFile(this.config.outPath, this.config.fileName, '.svg')
                    )
                )
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
    addSvgsToMap (icons: IconObject[]) {
        icons.forEach((icon) => {
            this.addSingleSvgToMap(icon);
        });

        this.fontStream.end();
        this.resolve();
    }

    /**
     *
     */
    addSingleSvgToMap (icon: IconObject) {
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