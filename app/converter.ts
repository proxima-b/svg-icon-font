import * as fs from 'fs';
import * as svgicons2svgfont from 'svgicons2svgfont';
import * as fonteditorcore from 'fonteditor-core';
import * as svg2ttf from 'svg2ttf';

import { IConfig } from './interfaces';
import { Tools } from './tools';

export class Converter {

    private tools;
    private fontStream;

    constructor (private config: IConfig) {
        this.tools = new Tools;
        this.fontStream = svgicons2svgfont({fontName: config.fontName});
    }

    svgToMap () {
        this.fontStream.pipe(
            fs.createWriteStream(
                this.tools.locateFile(this.config.svgsPath, this.config.fileName, '.svg')
            )
        ).on('finish',function() {
            console.log('###--- SVG Map created');
            //otherFormats();
        }).on('error',function(err) {
            console.log(err);
        });
    }
}