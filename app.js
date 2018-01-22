var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var port = Number(process.env.PORT || 3130);

app.use(bodyParser.json());
app.post('/getResource', function (req, res) {
    console.log("Your request:" + req.body.toString());
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({name: 'Ilya', lastName: 'Isupov', workPlace: 'Netcracker'}));
});

/*Nodemailer*/
app.use(bodyParser.urlencoded({
    extended: true
}));


/*----Nodemailer----*/


// sending mail function
app.post('/send', function(req, res){
    if(req.body.email == "" || req.body.subject == ""||req.body.description == "") {
        res.send("Возможно данные введенны некорректно или не заполнены все поля ");
        return false;
    }

    // Sending Emails with SMTP, Configuring SMTP settings

    var smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com", // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        auth: {
            user: 'frontendge2018@gmail.com',
            pass: '08frontendge08'
        }
    });

    var mailOptions = {
        from: "Coffee House ✔ <frontendge2018@gmail.com>", // sender address
        to: req.body.email, // list of receivers
        subject: req.body.subject, // Subject line
        html: '<p>Приветствуем уважаемый ' + "<b>"+req.body.subject+" !</b>"   +
        '<p>Оповещаем Вас, что ваше сообщение ' + '" '+ "<b>"+req.body.description+" </b>" +  '" ' + 'полученно.</p>'+
        '<p> В ближайшее время, наш сотрудник свяжется с Вами. </p>',// plaintext body
        // html body
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            res.send("Возможно вы не правильно ввели адрес электроной почты. "+error);
        }else{
            res.send("Письмо было успешно отправленно.");
        }
    });
});

/*----End Nodemailer----*/


app.get('/', function(req,res){
    res.sendfile(__dirname + '/index.html');
});

app.get('/node_modules/jquery/dist/jquery.min.js', function(req,res){
    res.sendfile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
});

app.get('/contact', function(req,res){
    res.sendfile(__dirname + '/contact.html');
});
app.get('/service', function(req,res){
    res.sendfile(__dirname + '/service.html');
});
app.get('/about', function(req,res){
    res.sendfile(__dirname + '/about.html');
});
app.get('/menu', function(req,res){
    res.sendfile(__dirname + '/menu.html');
});

/*---MENU---*/
app.get('/cappuccino', function(req,res){
    res.sendfile(__dirname + '/menu/cappuccino.html');
});

app.get('/chocolate', function(req,res){
    res.sendfile(__dirname + '/menu/chocolate.html');
});

app.get('/cofe', function(req,res){
    res.sendfile(__dirname + '/menu/cofe.html');
});

app.get('/latte', function(req,res){
    res.sendfile(__dirname + '/menu/latte.html');
});

app.get('/kokos', function(req,res){
    res.sendfile(__dirname + '/menu/kokos.html');
});

app.get('/raf', function(req,res){
    res.sendfile(__dirname + '/menu/raf.html');
});

/*---END MENU---*/

app.get('/script.js', function(req,res){
    res.sendfile(__dirname + '/script.js');
});
app.get('/jquery-1.11.1.min.js', function(req,res){
    res.sendfile(__dirname + '/jquery-1.11.1.min.js');
});

app.get('/js/coda-slider.js', function(req,res){
    res.sendfile(__dirname + '/js/coda-slider.js');
});


app.get('/js/jquery.easing.1.3.js', function(req,res){
    res.sendfile(__dirname + '/js/jquery.easing.1.3.js');
});

app.get('/js/jquery.localscroll-1.2.5.js', function(req,res){
    res.sendfile(__dirname + '/js/jquery.localscroll-1.2.5.js');
});

app.get('/js/jquery.scrollTo-1.3.3.js', function(req,res){
    res.sendfile(__dirname + '/js/jquery.scrollTo-1.3.3.js');
});

app.get('/js/jquery.serialScroll-1.2.1.js', function(req,res){
    res.sendfile(__dirname + '/js/jquery.serialScroll-1.2.1.js');
});

app.get('/js/jquery-1.2.6.js', function(req,res){
    res.sendfile(__dirname + '/js/jquery-1.2.6.js');
});

app.get('/js/preloader.js', function(req,res){
    res.sendfile(__dirname + '/js/preloader.js');
});

app.get('/coda-slider.css', function(req,res){
    res.sendfile(__dirname + '/coda-slider.css');
});

app.get('/templatemo_style.css', function(req,res){
    res.sendfile(__dirname + '/templatemo_style.css');
});

app.get('/style.css', function(req,res){
    res.sendfile(__dirname + '/style.css');
});

app.use( express.static('img'));
// app.use('/public', express.static(__dirname,"/public"));

app.listen(3130, function () {
    console.log('Listening on port 3130...');
});

module.exports = app;
