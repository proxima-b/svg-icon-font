"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const converter_1 = require("./converter");
const linter_1 = require("./linter");
const config_1 = require("./config");
const loader_1 = require("./loader");
/**
 *
 */
class SvgIconFont {
    constructor(userConfig) {
        this.userConfig = userConfig;
        const config = new config_1.Config().set(this.userConfig).get();
        const loader = new loader_1.Loader(config);
        const linter = new linter_1.Linter();
        const converter = new converter_1.Converter(config);
        loader.load().then(() => {
            linter.lint(loader.mapFile).then(() => {
                converter.convert(loader.mapFile).then(() => {
                });
            });
        });
    }
}
exports.SvgIconFont = SvgIconFont;
//# sourceMappingURL=app.js.map