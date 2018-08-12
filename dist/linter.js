"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("./tools");
/**
 * Perform pre-checks on the provided SVGs before doing the conversion
 */
class Linter {
    /**
     *
     */
    constructor() {
        this.tools = new tools_1.Tools;
    }
    /**
     *
     */
    lint(icons) {
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
    checkDuplicates() {
        const charStash = [];
        const charErrors = [];
        const nameStash = [];
        const nameErrors = [];
        // Loop through each icons
        this.icons.forEach((icon) => {
            //
            if (charStash.indexOf(icon.char) > -1) {
                charErrors.push(icon);
            }
            else {
                charStash.push(icon.char);
            }
            //
            if (nameStash.indexOf(icon.name) > -1) {
                nameErrors.push(icon);
            }
            else {
                nameStash.push(icon.name);
            }
        });
        this.logDuplicates(charErrors, 'char', 'character keys');
        this.logDuplicates(nameErrors, 'name', 'character names');
    }
    /**
     *
     */
    logDuplicates(errors, key, title) {
        if (errors.length > 0) {
            this.tools.softError('Lint error: You have duplicate ' + title + ', please fix');
            errors.forEach((icon, index) => {
                this.tools.softError('#' + index);
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
exports.Linter = Linter;
//# sourceMappingURL=linter.js.map