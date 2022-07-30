import fs from 'fs'
import path from 'path'

const pathToFolder = path.join(__dirname, '../data')
const pathToFile = path.join(pathToFolder, 'emails.txt')

export const getEmailsFromDB = () => {
    if (fs.existsSync(pathToFile)) {
        const emails = fs.readFileSync(pathToFile, {
            encoding: 'utf8',
            flag: 'r',
        })
        const emailsArray = emails.split(',')
        return emailsArray
    }
    return []
}

export const addEmailToDB = (email: string) => {
    const emailsArray = getEmailsFromDB()
    if (emailsArray.length) {
        if (emailsArray.includes(email)) {
            return {
                status: 409,
                message: email,
            }
        } else {
            fs.appendFileSync(pathToFile, `,${email}`)
        }
    } else {
        fs.mkdirSync(pathToFolder)
        fs.appendFileSync(pathToFile, email)
    }
    return {
        status: 200,
        message: 'E-mail додано',
    }
}
