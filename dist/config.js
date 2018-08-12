"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
        this.params = {
            mapFile: 'svgicon.map.json',
            autoMap: true,
            svgsPath: '',
            fontName: '',
            fileName: '',
            outPath: '',
            scssFileName: '',
            tsFilename: ''
        };
        return this;
    }
    set(params) {
        this.params = Object.assign(this.params, params);
        return this;
    }
    get() {
        return this.params;
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map