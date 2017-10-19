"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Perform pre-checks on the provided SVGs before doing the conversion
 */
var Linter = /** @class */ (function () {
    function Linter(icons) {
        this.icons = icons;
    }
    Linter.prototype.checkDuplicates = function () {
        var _this = this;
        var errors = [];
        // Loop through each icons
        this.icons.forEach(function (item) {
            // return items that are the same as the loop itteration
            var test = _this.icons.filter(function (fail) {
                return fail.char === item.char;
            });
            // if there are duplicates, add to the array and log an error
            if (test.length > 1) {
                errors.push(item.name);
                console.log('------ ' + item.name + ' has a duplicate key :(');
            }
        });
    };
    return Linter;
}());
exports.Linter = Linter;
//# sourceMappingURL=linter.js.map