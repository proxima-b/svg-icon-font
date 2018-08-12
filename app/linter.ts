import {IconObject} from './interfaces';
import {Tools} from './tools';

/**
 * Perform pre-checks on the provided SVGs before doing the conversion
 */
export class Linter {

    // Tools Class
    private tools: Tools;
    // Promise resolver
    private resolve: Function;
    //
    private icons: IconObject[];

    /**
     *
     */
    constructor () {
        this.tools = new Tools;
    }

    /**
     *
     */
    lint (icons: IconObject[]) {
        this.icons = icons;

        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.checkDuplicates();
            this.resolve();
        });
    }

    /**
     *
     */
    checkDuplicates () {
        const charStash = [];
        const charErrors = [];
        const nameStash = [];
        const nameErrors = [];

        // Loop through each icons
        this.icons.forEach((icon) => {

            //
            if (charStash.indexOf(icon.char) > -1) {
                charErrors.push(icon);
            } else {
                charStash.push(icon.char);
            }

            //
            if (nameStash.indexOf(icon.name) > -1) {
                nameErrors.push(icon);
            } else {
                nameStash.push(icon.name);
            }
        });

        this.logDuplicates(charErrors, 'char', 'character keys');
        this.logDuplicates(nameErrors, 'name', 'character names');
    }

    /**
     *
     */
    logDuplicates (errors: Array<IconObject>, key: 'char' | 'name', title: string) {
        if (errors.length > 0) {
            this.tools.softError('Lint error: You have duplicate '+title+', please fix');

            errors.forEach((icon, index) => {
                this.tools.softError('#'+index);
                const duplicates = this.icons.filter(item => {
                    return item[key] === icon[key];
                });
                duplicates.forEach(err => {
                    this.tools.softError(`---{ ${err[key]} }---> ${err.path}`);
                });
            });

            process.exit();
        }
    }
}