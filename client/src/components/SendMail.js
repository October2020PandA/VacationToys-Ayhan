var nodemailer = require('nodemailer');

export default function sendEmail(to, text) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ayhandurak87@gmail.com',
          pass: 'Elation2308Arestova'
        }
      });
      
      var mailOptions = {
        from: 'ayhandurak87@gmail.com',
        to,
        subject: 'About your reservation',
        text
      };
      console.log('created');
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
}
