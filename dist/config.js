"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
        this.params = {
            mapPath: 'svgicon.map.json',
            autoMap: true,
            svgsPath: 'xxx',
            fontName: '',
            fileName: '',
            scssFileName: '',
            tsFilename: ''
        };
        return this;
    }
    Config.prototype.set = function (params) {
        this.params = Object.assign(this.params, params);
        return this;
    };
    Config.prototype.get = function () {
        return this.params;
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map