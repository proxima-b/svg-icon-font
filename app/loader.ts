import * as fs from 'fs';
import * as path from 'path';

import { IConfig, IconObject } from './interfaces';
import { Tools } from './tools';

/**
 *
 */
export class Loader {

    tools;
    icons = [];
    mappedIcons = [];
    mapFile: IconObject[];

    /**
     *
     */
    constructor (private config: IConfig) {
        this.tools = new Tools();
        this.tools.log('Running Loader');
    }

    /**
     * Get the mapping file content, and update if automapping
     */
    public getMap (): void {
        let newFile: number;

        // If the mapping file doesn't exist, create it
        if (!fs.existsSync(this.config.mapPath)) {

            // Warning
            this.tools.log('Could not find mapping file');

            // Create the file
            newFile = fs.openSync(this.config.mapPath, 'w');

            // Log if the file was created
            if (newFile) {
                this.tools.log('Mapping file created: svgicon.map.json');
            }
        }



        // Read the file
        fs.readFile(this.config.mapPath, 'utf8', (err, data) => {

            // Error
            this.tools.error(err, 'ENOENT', 'Mapping file could not be created');

            // Get the mapping file content
            if (data) {
                this.mapFile = JSON.parse(data);
            }

            // If auto mapping is turned on, update the map
            if(this.config.autoMap === true) {
                this.updateMap();
            }
        });
    }

    /**
     * Initialise updating the mapping files
     */
    updateMap (): void {
        this.updateFlatMap(this.mapFile);
    }

    /**
     *
     */
    public updateFlatMap (existing: IconObject[] = []): void {
        let writeData: string;
        let lastKey: number = this.tools.hexToDec('A000');

        /**
         * Load data from the existing map file
         */
        fs.readdir(this.config.svgsPath, (err: object, files: string[]) => {
            // Check if the file exists
            this.tools.error(err, 'ENOENT', 'svgsPath could not be found');

            // Remove and existing files from the files array
            if(existing) {
                existing.some(icon => {
                    if (icon.path && files.indexOf(icon.path) > -1) {
                        files.splice(files.indexOf(icon.path), 1);

                        // Bail out if all the files are already mapped
                        return files.length === 0;
                    }
                });

                if (existing[existing.length -1]) {
                    lastKey = this.tools.hexToDec(existing[existing.length - 1].char);
                }
            }

            // Push any new items
            files.forEach(file => {
                lastKey++;
                existing.push({
                    name: file.replace(/\.[^/.]+$/, ''),
                    path: file,
                    char: this.tools.decToHex(lastKey)
                });
            });

            if(existing) {
                this.mapFile = existing;
                writeData = JSON.stringify(existing);

                fs.writeFile(this.config.mapPath, writeData, (err) => {
                    if (err) {
                        return this.tools.log(err);
                    }

                    this.tools.log('Mapping file updated');
                });
            }
        })
    }
}