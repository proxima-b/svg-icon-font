import { IConfig } from './interfaces';

export class Config {

    params: IConfig;

    constructor () {
        this.params = {
            mapFile: 'svgicon.map.json',
            autoMap: true,
            svgsPath: '',
            fontName: '',
            fileName: '',
            outPath: '',
            scssFileName: '',
            tsFilename: ''
        }
        return this;
    }

    set (params) {
        this.params = (<any> Object).assign(this.params, params);
        return this;
    }

    get () {
        return this.params;
    }

}