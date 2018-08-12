"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
/**
 * Tools to be used throughout
 */
class Tools {
    constructor() {
        this.locateFile = (path, name, extension) => {
            return this.formatDirName(path) + this.formatFileName(name) + extension;
        };
        this.formatDirName = (dir) => {
            if (dir && dir.substring(dir.length - 1) !== '/') {
                dir = dir + '/';
            }
            return dir;
        };
        this.formatFileName = (file) => {
            if (file && file[0] === '/') {
                file = file.substring(1);
            }
            return file;
        };
        this.getFileName = (fileName) => {
            return fileName.replace(/^.*[\\\/]/, '');
        };
        this.log = (msg, type) => {
            let prefix = '###---|';
            let suffix = '';
            if (type === 'err' || type === 'softerr') {
                prefix = '#---xx|';
            }
            if (type === 'err') {
                suffix = '... can\'t continue';
            }
            console.log(prefix + '  ' + msg + suffix);
        };
        this.error = (msg) => {
            if (msg) {
                this.log(msg, 'err');
                process.exit(1);
            }
        };
        this.softError = (msg) => {
            if (msg) {
                this.log(msg, 'softerr');
            }
        };
        this.errorHandler = (err, params) => {
            if (err) {
                if (err.code === 'ENOET') {
                    this.log(params.filename + ' could not be created', 'err');
                    process.exit(1);
                }
            }
        };
        this.hexToDec = (num) => {
            return parseInt(num, 16);
        };
        this.decToHex = (num) => {
            return num.toString(16).toUpperCase();
        };
        this.fileObjectToString = (file) => {
            if (typeof file === 'object' && file.path && file.name && file.extension) {
                return this.formatDirName(file.path) + this.formatFileName(file.name + '.' + file.extension);
            }
            else {
                return file;
            }
        };
        this.readFile = (fileName, type) => {
            return new Promise((resolve, reject) => {
                fs.readFile(fileName, type, (err, data) => {
                    this.errorHandler(err, { filename: this.getFileName(fileName) });
                    resolve(data);
                });
            });
        };
        this.prepareFile = (file, name) => {
            let newFile;
            const filename = name ? name : 'file';
            //
            if (typeof file === 'object' && file.path) {
                if (!fs.existsSync(file.path)) {
                    // Create the dir
                    fs.mkdirSync(file.path);
                }
            }
            // Take the file object and covert it to string if needed
            file = this.fileObjectToString(file);
            // If the file doesn't exist, create it
            if (!fs.existsSync(file)) {
                // Warning
                this.log('Could not find ' + filename);
                // Create the file
                newFile = fs.openSync(file, 'w');
                // Log if the file was created
                if (newFile) {
                    this.log(filename + ' created: ' + this.formatFileName(file));
                }
            }
            return newFile;
        };
        return this;
    }
}
exports.Tools = Tools;
//# sourceMappingURL=tools.js.map