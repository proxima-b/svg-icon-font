/**
 * Object containing details of an Icon
 */
export interface IconObject {
    name: string;
    char: string;
    path: string;
}

/**
 *
 */
export interface IConfig {
    mapFile: string;
    autoMap: boolean;
    svgsPath: string;
    outPath: string;
    fontName: string;
    fileName: string;
    scssFileName: string;
    tsFilename: string;
}

/**
 * File object
 */
export interface IFile {
    path: string;
    name: string;
    extension: string;
}