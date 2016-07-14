//by Houyuan Pan
// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
//require the mongoose database
var mongoose = require('mongoose');
// Require body-parser (to receive post data from clients)
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');
//
var UserSchema = new mongoose.Schema({
 _id: Number,
 name: String,
 age: Number,
 type: String
})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'
//
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
    User.find({}, function(err, users){
      if(err){
        console.log('something went wrong! It is Casey fault! and Alex is a piece of shit!');
      }else{
        // var passuser = res.json(users);
        console.log('it works, but Alex is still a piece of shit.');
        console.log(users);
        res.render('index', {users});
      }
    })
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
})
app.get('/mongooses/new', function(req,res){
  res.render('new');
})
// Add User Request
var add;
if(!add){
var counter = 0;
}
app.post('/mongooses', function(req, res) {
    console.log("POST DATA", req.body);
    var user = new User({_id:counter, name: req.body.name, age: req.body.age, type: req.body.type});
    user.save(function(err){
      if(err){
        console.log('something went wrong');
      } else {
          counter++;
          add = true;
        console.log('successfully added a animal!');
        res.redirect('/');
      }
    })
})
//show only one animal
app.get('/mongooses/:id', function(req, res){
  User.findOne({_id: req.params.id}, function(err, user){
    if(!err){
      console.log("it works for a specific id!");
      console.log(user);
      res.render('one', {user:user});
    }
  })
})
//show a form to edit an existing mongoose
app.get('/mongooses/:id/edit', function(req, res){
  User.findOne({_id: req.params.id}, function(err, user){
    if(!err){
      console.log("Working?");
      res.render('edit', {user:user});
    }
  })
})
//the action attribute for the form in the above Routes
app.post('/mongooses/:id', function(req, res){
  User.findOne({_id: req.body.id}, function(err, user){
    user.name = req.body.name;
    user.age = req.body.age;
    user.type = req.body.type;
    user.save(function(err){
      if(!err){
        console.log("update successfully!");
        res.redirect('/')
      }
    })
  })
})
//delete the mongoose from the database by ID
app.post('/mongooses/:id/destroy', function(req,res){
  User.remove({_id: req.params.id}, function(err){
    if(!err){
      console.log("successfully deleted!");
      res.redirect('/')
    }
  })
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
