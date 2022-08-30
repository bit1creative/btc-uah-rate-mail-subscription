import fs from 'fs';

import { pathToFolderDB, pathToFileDB } from '../constants';

export const getEmailsFromDB = async () => {
    if (fs.existsSync(pathToFolderDB)) {
        const emails = await fs.promises.readFile(pathToFileDB, {
            encoding: 'utf8',
            flag: 'r',
        });
        const emailsArray = emails.split(',');
        return emailsArray;
    }
    return [];
};
