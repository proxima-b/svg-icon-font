import { IConfig } from './interfaces';
import { Converter } from './converter';
import { Linter } from './linter';
import { Config } from './config';
import { Loader } from './loader';

/**
 *
 */
export class SvgIconFont {

    constructor (private userConfig: IConfig) {
        const config = new Config().set(this.userConfig).get();
        const loader = new Loader(config);
        const linter = new Linter();
        const converter = new Converter(config);

        loader.load().then(() => {
            linter.lint(loader.mapFile).then(() => {
                converter.convert(loader.mapFile).then(() => {

                });
            });
        });
    }

}