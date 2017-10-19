"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var converter_1 = require("./converter");
var linter_1 = require("./linter");
var config_1 = require("./config");
var loader_1 = require("./loader");
var SvgIconFont = /** @class */ (function () {
    function SvgIconFont(userConfig) {
        this.userConfig = userConfig;
        var config = new config_1.Config().set(this.userConfig).get();
        var loader = new loader_1.Loader(config);
        loader.getMap();
        var linter = new linter_1.Linter([]);
        var converter = new converter_1.Converter(config);
    }
    return SvgIconFont;
}());
exports.SvgIconFont = SvgIconFont;
//# sourceMappingURL=app.js.map