import fs from 'fs';
import path from 'path';

const pathToFolder = path.join(__dirname, '../data');
const pathToFile = path.join(pathToFolder, 'emails.txt');

export const getEmailsFromDB = () => {
    if (fs.existsSync(pathToFile)) {
        const emails = fs.readFileSync(pathToFile, {
            encoding: 'utf8',
            flag: 'r',
        });
        const emailsArray = emails.split(',');
        return emailsArray;
    }
    return [];
};
