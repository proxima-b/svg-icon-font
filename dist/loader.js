"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const tools_1 = require("./tools");
/**
 * Get the content of the mapping file and update it if needed
 */
class Loader {
    /**
     *
     */
    constructor(config) {
        this.config = config;
        this.tools = new tools_1.Tools();
        this.tools.log('Running Loader');
    }
    /**
     * Initialise
     */
    load() {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.getMap();
        });
    }
    /**
     * Get the mapping file content, and update if automapping
     */
    getMap() {
        let newFile;
        // If the mapping file doesn't exist, create it
        this.tools.prepareFile(this.config.mapFile, 'Mapping file');
        // Read the mapping file and update it if needed
        this.tools.readFile(this.config.mapFile, 'utf8')
            .then((data) => {
            // Get the mapping file content
            if (Object.keys(data).length > 0) {
                this.mapFile = JSON.parse(data);
            }
            // If auto mapping is turned on, update the map
            if (this.config.autoMap === true) {
                this.updateMap();
            }
            else {
                this.resolve();
            }
        });
    }
    /**
     * Initialise updating the mapping files
     */
    updateMap() {
        this.updateFlatMap(this.mapFile);
    }
    /**
     *
     */
    updateFlatMap(existing = []) {
        let writeData;
        let lastKey = this.tools.hexToDec('A000');
        /**
         * Load data from the existing map file
         */
        fs.readdir(this.config.svgsPath, (err, files) => {
            // Check if the file exists
            this.tools.errorHandler(err, { filename: 'svgPaths' });
            // Remove and existing files from the files array
            if (existing) {
                const stash = [];
                existing.forEach((icon, index) => {
                    const iconFileName = this.tools.getFileName(icon.path);
                    if (icon.path && files.indexOf(iconFileName) === -1) {
                        // Remove any icons that have been deleted
                        existing.splice(index, 1);
                    }
                    else {
                        // Add new files that have been added
                        files.splice(files.indexOf(iconFileName), 1);
                    }
                    // If something went wrong and there are duplicates, remove them
                    if (stash.indexOf(icon.path) > -1) {
                        existing.splice(index, 1);
                    }
                    else {
                        stash.push(icon.path);
                    }
                });
                // Get the last char key
                if (existing[existing.length - 1]) {
                    lastKey = this.tools.hexToDec(existing[existing.length - 1].char);
                }
            }
            // Push any new items
            files.forEach(file => {
                lastKey++;
                existing.push({
                    name: file.replace(/\.[^/.]+$/, ''),
                    path: this.tools.formatDirName(this.config.svgsPath) + this.tools.formatFileName(file),
                    char: this.tools.decToHex(lastKey)
                });
            });
            if (existing) {
                this.mapFile = existing;
                writeData = JSON.stringify(existing);
                fs.writeFile(this.config.mapFile, writeData, (err) => {
                    if (err) {
                        return this.tools.log(err);
                    }
                    this.tools.log('Mapping file updated');
                    this.resolve();
                });
            }
        });
    }
}
exports.Loader = Loader;
//# sourceMappingURL=loader.js.map