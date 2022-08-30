import fs from 'fs';

import { getEmailsFromDB } from '../libs/fs';
import { getRateBTCUAH } from '../api/binance';
import { sendEmails } from '../libs/nodemailer';

import { pathToFileDB, pathToFolderDB } from '../constants';

export class EmailService {
    static addEmailToDB = async (email: string) => {
        const emailsArray = await getEmailsFromDB();

        if (!emailsArray.length) {
            await fs.promises.mkdir(pathToFolderDB);
            await fs.promises.appendFile(pathToFileDB, email);
            return { status: 200, message: 'E-mail додано' };
        }

        if (emailsArray.includes(email)) return { status: 409, message: email };

        await fs.promises.appendFile(pathToFileDB, `,${email}`);
        return { status: 200, message: 'E-mail додано' };
    };

    static sendEmails = async () => {
        const { price } = await getRateBTCUAH();
        const emails = await getEmailsFromDB();

        if (price && emails.length) {
            const info = await sendEmails(price, emails);
            if (info.rejected.length !== emails.length) {
                return { status: 200, message: 'E-mailʼи відправлено' };
            }
        }
        throw new Error('Щось пішло не так :(');
    };
}
