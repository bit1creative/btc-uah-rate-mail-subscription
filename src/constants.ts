import path from 'path';

export const BINANCE_URI = 'https://api.binance.com/api/v3';
export const pathToFolderDB = path.join(__dirname, './data');
export const pathToFileDB = path.join(pathToFolderDB, 'emails.txt');
