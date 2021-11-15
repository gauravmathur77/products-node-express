// include nodemailer
const nodemailer = require('nodemailer');

module.exports = {
    sendEmail:  function(toEmail, sub, message) {
        let fromMail = 'gauravmathur94@gmail.com';
        let toMail = toEmail;
        
        
        let subject  = sub;
        let text = message
        
        // auth
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gauravmathur77@gmail.com',
                pass: 'Seagate@001'
            }
        });
        
        // email options
        let mailOptions = {
            from: fromMail,
            to: toMail,
            subject: subject,
            text: text
        };
        
        // send email
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
            }
            console.log(response)
        });
    }
}