import {IconObject} from './interfaces';

/**
 * Perform pre-checks on the provided SVGs before doing the conversion
 */
export class Linter {

    constructor ( private icons: IconObject[] ) {

    }

    checkDuplicates () {
        let errors = [];

        // Loop through each icons
        this.icons.forEach((item: IconObject) => {

            // return items that are the same as the loop itteration
            const test = this.icons.filter((fail) => {
                return fail.char === item.char;
            });

            // if there are duplicates, add to the array and log an error
            if(test.length > 1) {
                errors.push(item.name)
                console.log('------ ' + item.name + ' has a duplicate key :(')
            }
        })
    }
}