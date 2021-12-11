const express = require("express")
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;

// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  var Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // for servering ststic file
app.use(express.urlencoded())


// PUG SPECIFIC STUFF
app.set('view engine', 'pug')  // set the template engine as pug
app.set('views', path.join(__dirname, 'views'))  // set the view directory

// ENDPOINTS
app.get('/',(req, res)=>{
   const parms = {}
   res.status(200).render('home.pug', parms);
})

app.get('/contact',(req, res)=>{
    const parms = {}
    res.status(200).render('contact.pug', parms);
 })

 app.post('/contact',(req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(() =>{
        res.send("This item has been saved in database")
    }).catch(() =>{
        res.status(400).send("Item was not saved in database")
    });
    // res.status(200).render('contact.pug');
 })



// START THE SERVER
app.listen(port, ()=>{
    console.log(`This application started sucessfully on port ${port}`)
})