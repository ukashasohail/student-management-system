const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var PORT = process.env.PORT || 5000;
const student = require("./models/models.js");

const app = express();

var engine = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// create connection to db
mongoose.connect('mongodb://localhost/sims',{useNewUrlParser:true});
const db = mongoose.connection;

//check for db error
db.on('error',(err)=>{
    console.log(err);
});

//check for successful db connection
db.once('open',()=>{
    console.log('connected to mongodb');
});



app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post("/post",(req,res)=>{
    var first_name = req.body.firstName;
    var last_name = req.body.lastName;
    var roll_no = req.body.rollNo;
    // console.log(first_name,last_name,roll_no);

    var studentobj = new student({
        firstName: first_name,
        lastName: last_name,
        rollNo: roll_no
    });
    
    studentobj.save((err)=>{
        console.log("Data has been saved");
        if (err){
            console.log(err);
        }
    });

    res.redirect("/");
});

app.post("/get",(req,res)=>{
    var to_search = req.body.toSearch;
    
    const query = {rollNo:to_search};   
    console.log(query);

    student.find(query,(err,stds)=>{
        let a = stds;
        console.log(stds);
        let b = stds[0];
        var x = b['firstName'];
        var y = b['lastName'];
        var z = b['rollNo'];
        res.render(__dirname + "/views/output.html", {x:x,y:y,z:z});


    });

});

app.listen(PORT,()=>{
    console.log("Listening on port 5000");
});