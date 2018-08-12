import * as fs from 'fs';

import { IFile } from './interfaces';

/**
 * Tools to be used throughout
 */
export class Tools {

    constructor () {
        return this;
    }

    public locateFile = (path, name, extension) => {
        return this.formatDirName(path) + this.formatFileName(name) + extension;
    }

    public formatDirName = (dir: string) => {
        if(dir && dir.substring(dir.length - 1) !== '/') {
            dir = dir + '/';
        }
        return dir;
    }

    public formatFileName = (file: string) => {
        if (file && file[0] === '/') {
            file = file.substring(1);
        }
        return file;
    }

    public getFileName = (fileName): string => {
        return fileName.replace(/^.*[\\\/]/, '');
    }

    public log = (msg, type?: 'log' | 'err' | 'softerr') => {
        let prefix = '###---|';
        let suffix = '';
        if(type === 'err' || type === 'softerr') {
            prefix = '#---xx|';
        }
        if(type === 'err') {
            suffix = '... can\'t continue';
        }
        console.log(prefix + '  ' + msg + suffix);
    }

    public error = (msg) => {
        if (msg) {
            this.log(msg, 'err');
            process.exit( 1 );
        }
    };

    public softError = (msg) => {
        if (msg) {
            this.log(msg, 'softerr');
        }
    };

    public errorHandler = (err, params) => {
        if (err) {
            if (err.code === 'ENOET') {
                this.log(params.filename + ' could not be created', 'err');
                process.exit( 1 );
            }
        }
    }

    public hexToDec = (num: string): number => {
        return parseInt(num,16);
    }

    public decToHex = (num: number): string => {
        return num.toString(16).toUpperCase();
    }

    public fileObjectToString = (file: string | IFile): string => {
        if(typeof file === 'object' && file.path && file.name && file.extension) {
            return this.formatDirName(file.path) + this.formatFileName(file.name +'.'+ file.extension)
        } else {
            return <string> file;
        }
    }

    public readFile = (fileName, type) => {
        return new Promise((resolve, reject) => {
            fs.readFile(fileName, type, (err, data) => {
                this.errorHandler(err, {filename: this.getFileName(fileName)});
                resolve(data);
            })
        });
    }

    public prepareFile = (file: string | IFile, name?: string): number => {
        let newFile: number;
        const filename = name ? name : 'file';

        //
        if(typeof file === 'object' && file.path) {
            if (!fs.existsSync(file.path)) {
                // Create the dir
                fs.mkdirSync(file.path);
            }
        }

        // Take the file object and covert it to string if needed
        file = this.fileObjectToString(<IFile> file);

        // If the file doesn't exist, create it
        if (!fs.existsSync(<string> file)) {

            // Warning
            this.log('Could not find ' + filename);

            // Create the file
            newFile = fs.openSync(<string> file, 'w');

            // Log if the file was created
            if (newFile) {
                this.log(filename +' created: ' + this.formatFileName(<string> file));
            }
        }

        return newFile;
    }
}