import { IConfig } from './interfaces';
import { Tools } from './tools';
import { Converter } from './converter';
import { Linter } from './linter';
import { Config } from './config';
import { Loader } from './loader';

export class SvgIconFont {

    constructor (private userConfig: IConfig) {
        const config = new Config().set(this.userConfig).get();
        const loader = new Loader(config);
        loader.getMap();
        const linter = new Linter([]);
        const converter = new Converter(config);
    }

}