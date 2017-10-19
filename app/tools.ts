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

    public log = (msg, type?: 'log' | 'err') => {
        let prefix = '###---|';
        let suffix = '';
        if(type === 'err') {
            prefix = '#---xx|';
            suffix = '... can\'t continue';
        }
        console.log(prefix + '  ' + msg + suffix);
    }

    public error = (err, type, msg) => {
        if(err &&  err.code === type) {
            this.log(msg, 'err');
            process.exit( 1 );
        }
    }

    public hexToDec = (num: string): number => {
        return parseInt(num,16);
    }

    public decToHex = (num: number): string => {
        return num.toString(16).toUpperCase();
    }
}