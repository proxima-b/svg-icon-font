import * as fs from 'fs';

import { IConfig, IconObject } from './interfaces';
import { Tools } from './tools';

/**
 * Get the content of the mapping file and update it if needed
 */
export class Loader {

    // Tools Class
    private tools: Tools;
    // Content of the map file
    public mapFile: IconObject[];
    // Promise resolver
    private resolve: Function;

    /**
     *
     */
    constructor (private config: IConfig) {
        this.tools = new Tools();
        this.tools.log('Running Loader');
    }

    /**
     * Initialise
     */
    public load (): Promise<void> {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.getMap();
        });
    }

    /**
     * Get the mapping file content, and update if automapping
     */
    private getMap (): void {
        let newFile: number;

        // If the mapping file doesn't exist, create it
        this.tools.prepareFile(this.config.mapFile, 'Mapping file');

        // Read the mapping file and update it if needed
        this.tools.readFile(this.config.mapFile, 'utf8')
            .then((data) => {
                // Get the mapping file content
                if (Object.keys(data).length > 0) {
                    this.mapFile = JSON.parse(<string> data);
                }

                // If auto mapping is turned on, update the map
                if(this.config.autoMap === true) {
                    this.updateMap();
                } else {
                    this.resolve();
                }
            });
    }

    /**
     * Initialise updating the mapping files
     */
    private updateMap (): void {
        this.updateFlatMap(this.mapFile);
    }

    /**
     *
     */
    private updateFlatMap (existing: IconObject[] = []): void {
        let writeData: string;
        let lastKey: number = this.tools.hexToDec('A000');

        /**
         * Load data from the existing map file
         */
        fs.readdir(this.config.svgsPath, (err: object, files: string[]) => {
            // Check if the file exists
            this.tools.errorHandler(err, {filename: 'svgPaths'});

            // Remove and existing files from the files array
            if(existing) {
                const stash = [];

                existing.forEach((icon, index) => {
                    const iconFileName = this.tools.getFileName(icon.path);

                    if (icon.path && files.indexOf(iconFileName) === -1) {
                        // Remove any icons that have been deleted
                        existing.splice(index, 1);
                    } else {
                        // Add new files that have been added
                        files.splice(files.indexOf(iconFileName), 1);
                    }

                    // If something went wrong and there are duplicates, remove them
                    if (stash.indexOf(icon.path) > -1) {
                        existing.splice(index, 1);
                    } else {
                        stash.push(icon.path);
                    }
                });

                // Get the last char key
                if (existing[existing.length -1]) {
                    lastKey = this.tools.hexToDec(existing[existing.length - 1].char);
                }
            }

            // Push any new items
            files.forEach(file => {
                lastKey++;
                existing.push({
                    name: file.replace(/\.[^/.]+$/, ''),
                    path: this.tools.formatDirName(this.config.svgsPath) + this.tools.formatFileName(file),
                    char: this.tools.decToHex(lastKey)
                });
            });

            if(existing) {
                this.mapFile = existing;
                writeData = JSON.stringify(existing);

                fs.writeFile(this.config.mapFile, writeData, (err) => {
                    if (err) {
                        return this.tools.log(err);
                    }

                    this.tools.log('Mapping file updated');
                    this.resolve();
                });
            }
        })
    }
}