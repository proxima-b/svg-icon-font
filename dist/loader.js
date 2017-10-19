"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var tools_1 = require("./tools");
/**
 *
 */
var Loader = /** @class */ (function () {
    /**
     *
     */
    function Loader(config) {
        this.config = config;
        this.icons = [];
        this.mappedIcons = [];
        this.tools = new tools_1.Tools();
        this.tools.log('Running Loader');
    }
    /**
     * Get the mapping file content, and update if automapping
     */
    Loader.prototype.getMap = function () {
        var _this = this;
        var newFile;
        // If the mapping file doesn't exist, create it
        if (!fs.existsSync(this.config.mapPath)) {
            // Warning
            this.tools.log('Could not find mapping file');
            // Create the file
            newFile = fs.openSync(this.config.mapPath, 'w');
            // Log if the file was created
            if (newFile) {
                this.tools.log('Mapping file created: svgicon.map.json');
            }
        }
        // Read the file
        fs.readFile(this.config.mapPath, 'utf8', function (err, data) {
            // Error
            _this.tools.error(err, 'ENOENT', 'Mapping file could not be created');
            // Get the mapping file content
            if (data) {
                _this.mapFile = JSON.parse(data);
            }
            // If auto mapping is turned on, update the map
            if (_this.config.autoMap === true) {
                _this.updateMap();
            }
        });
    };
    /**
     * Initialise updating the mapping files
     */
    Loader.prototype.updateMap = function () {
        this.updateFlatMap(this.mapFile);
    };
    /**
     *
     */
    Loader.prototype.updateFlatMap = function (existing) {
        var _this = this;
        if (existing === void 0) { existing = []; }
        var writeData;
        var lastKey = this.tools.hexToDec('A000');
        /**
         * Load data from the existing map file
         */
        fs.readdir(this.config.svgsPath, function (err, files) {
            // Check if the file exists
            _this.tools.error(err, 'ENOENT', 'svgsPath could not be found');
            // Remove and existing files from the files array
            if (existing) {
                existing.some(function (icon) {
                    if (icon.path && files.indexOf(icon.path) > -1) {
                        files.splice(files.indexOf(icon.path), 1);
                        // Bail out if all the files are already mapped
                        return files.length === 0;
                    }
                });
                if (existing[existing.length - 1]) {
                    lastKey = _this.tools.hexToDec(existing[existing.length - 1].char);
                }
            }
            // Push any new items
            files.forEach(function (file) {
                lastKey++;
                existing.push({
                    name: file.replace(/\.[^/.]+$/, ''),
                    path: file,
                    char: _this.tools.decToHex(lastKey)
                });
            });
            if (existing) {
                _this.mapFile = existing;
                writeData = JSON.stringify(existing);
                fs.writeFile(_this.config.mapPath, writeData, function (err) {
                    if (err) {
                        return _this.tools.log(err);
                    }
                    _this.tools.log('Mapping file updated');
                });
            }
        });
    };
    return Loader;
}());
exports.Loader = Loader;
//# sourceMappingURL=loader.js.map