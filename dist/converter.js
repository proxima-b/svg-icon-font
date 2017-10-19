"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var svgicons2svgfont = require("svgicons2svgfont");
var tools_1 = require("./tools");
var Converter = /** @class */ (function () {
    function Converter(config) {
        this.config = config;
        this.tools = new tools_1.Tools;
        this.fontStream = svgicons2svgfont({ fontName: config.fontName });
    }
    Converter.prototype.svgToMap = function () {
        this.fontStream.pipe(fs.createWriteStream(this.tools.locateFile(this.config.svgsPath, this.config.fileName, '.svg'))).on('finish', function () {
            console.log('###--- SVG Map created');
            //otherFormats();
        }).on('error', function (err) {
            console.log(err);
        });
    };
    return Converter;
}());
exports.Converter = Converter;
//# sourceMappingURL=converter.js.map