import nodemailer from 'nodemailer'

const mailTemplate = (rate: string) => `<b>BTC/UAH: ${rate}</b>`

export const sendEmails = async (rate: string, emailsArray: string[]) => {
  const pass = process.env.GMAIL_APP_PASS
  const template = mailTemplate(rate);
  const emails = emailsArray;
  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'genesis.test.email2022@gmail.com',
          pass: pass,
        },
      });
    
      const info = await transporter.sendMail({
        from: '"Genesis School" <genesis.test.email2022@gmail.com>',
        to: emails,
        subject: "BTCUAH Rate",
        text: rate,
        html: template,
      });

      return info;
}