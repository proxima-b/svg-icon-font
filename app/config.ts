import { IConfig } from './interfaces';

export class Config {

    params: IConfig;

    constructor () {
        this.params = {
            mapPath: 'svgicon.map.json',
            autoMap: true,
            svgsPath: 'xxx',
            fontName: '',
            fileName: '',
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