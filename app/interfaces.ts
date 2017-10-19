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
    mapPath: string;
    autoMap: boolean;
    svgsPath: string;
    fontName: string;
    fileName: string;
    scssFileName: string;
    tsFilename: string;
}