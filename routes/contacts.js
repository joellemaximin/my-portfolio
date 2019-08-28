let express = require('express');
let router = express.Router();
var nodemailer = require('nodemailer');
// let transporter = nodemailer.createTransport(transport[defaults])
//get the comment model
let Contact = require('../models/contact');

router.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
        if (err){
            console.log(err);
        } else {
            res.send(contacts); 
            // res.render('index', {
            //     contacts: contacts
            // }); 
        }
    });
});





//je récupère mes donnée apres validation du form avec method post
router.post('/', function(req, res){
    let contact = new Contact();
    contact.username = req.body.username;
    contact.phone = req.body.phone;
    contact.email = req.body.email;
    contact.message = req.body.message;

    contact.save(function(err){
        if(err){
            console.log(err);
            // res.render('error')
            return;
        } else {
            //votre message est bien envoyé
            res.redirect('/');
        }
    })

    
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'joe.maximuum@gmail.com', // generated ethereal user
        pass: 'objectif2312' // generated ethereal password
    },
    tls: {
    rejectUnauthorized: false
  }
});

// send mail with defined transport object
    let mailOptions = {
        from: '"Merci intérêt pour mon CV" <joe.maximuum@gmail.com>', // sender address
        to: 'joelle.maximin@gmail.com', // list of receivers
        subject: "Recherche d'emploi", // Subject line
        text:' Name:'+ req.body.username + 'Email:'+req.body.email + 'Numéro:' + req.body.phone + 'Informations:' + req.body.info,
        html:'<h2>Nom:'+ req.body.username+', Email:'+req.body.email+',Numéro:' + req.body.phone+ 'Informations:' + req.body.info+ '</li></ul>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            return console.log(error);
        } else {
            console.log('Email: '+ info.response)
            res.redirect('/');
        }
    });
}); 



// main().catch(console.error);
module.exports = router;

    
