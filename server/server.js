const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

require("./models/reservation.model");
require("./config/mongoose.config")

require("./routes/reservation.routes")(app);
app.post('/send',(req,sendRes) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '**',
            pass: '**'
        }
    });
    var mailOptions = {
        from: 'ayhandurak87@gmail.com',
        to: req.body.to,
        subject: 'About your reservation',
        text: req.body.text
    };
    console.log('created');
    transporter.sendMail(mailOptions,  function(err, res) {
        if (err) {
            sendRes.send({"message": `It was an error: ${err}`, "code": "fail"})
          console.error('there was an error: ', err);
        } else {
            sendRes.send({"message": "Mail went successfully", "code": "success"})
          console.log('here is the res: ', res)
        }
    });
})

app.listen(8000, () => console.log("The server is listening on port 8000"))
