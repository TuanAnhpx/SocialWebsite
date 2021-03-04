const nodemailer = require('nodemailer');

class MailService{
    transporter;
    static init(){
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
    }

    static async sendMail(from, to, subject, text, html){
        const info = await this.transporter.sendMail({
            from,
            to,
            subject,
            text,
            html
        });
        return info;
    }
}

module.exports = MailService;