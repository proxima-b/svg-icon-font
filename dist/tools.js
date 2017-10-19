"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tools to be used throughout
 */
var Tools = /** @class */ (function () {
    function Tools() {
        var _this = this;
        this.locateFile = function (path, name, extension) {
            return _this.formatDirName(path) + _this.formatFileName(name) + extension;
        };
        this.formatDirName = function (dir) {
            if (dir && dir.substring(dir.length - 1) !== '/') {
                dir = dir + '/';
            }
            return dir;
        };
        this.formatFileName = function (file) {
            if (file && file[0] === '/') {
                file = file.substring(1);
            }
            return file;
        };
        this.log = function (msg, type) {
            var prefix = '###---|';
            var suffix = '';
            if (type === 'err') {
                prefix = '#---xx|';
                suffix = '... can\'t continue';
            }
            console.log(prefix + '  ' + msg + suffix);
        };
        this.error = function (err, type, msg) {
            if (err && err.code === type) {
                _this.log(msg, 'err');
                process.exit(1);
            }
        };
        this.hexToDec = function (num) {
            return parseInt(num, 16);
        };
        this.decToHex = function (num) {
            return num.toString(16).toUpperCase();
        };
        return this;
    }
    return Tools;
}());
exports.Tools = Tools;
//# sourceMappingURL=tools.js.map