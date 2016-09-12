var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create-post',function(req,res){
  fs.readFile(__dirname + '/data/posts.json', function (error, file) {

      var parsedFile = JSON.parse(file);
      var newBlogPost = req.body.blogpost;
      parsedFile[Date.now()] = newBlogPost;
      var stringifiedPost = JSON.stringify(parsedFile);

      fs.writeFile(__dirname + '/data/posts.json', stringifiedPost, function (error) {
        if (error){
          console.log(error);
        } else {
          res.redirect('/');
        }
      });
  });

  app.get('/get-posts',function(req,res){
    res.sendFile(__dirname + '/data/posts.json');
  });
});

app.get('/posts/:postId', function (req, res) {
  // console.log(req.params);
    // res.send('post id: '+ req.params.postId);
    fs.readFile(__dirname + '/data/posts.json', function (error, file) {
      var parsedFile = JSON.parse(file);
      var postId = req.params.postId;
      var content = parsedFile[postId];
      console.log(content);
      res.send(content);
  });
});

app.listen(3000,function(){
  console.log('Server is listening on port 3000. Ready to accept requests!');
});

// app.get('/',function(req,res){
//   // console.log(req);
//   res.send("Is it getting my response??");
// });
//
// app.get('/nodegirls',function(req,res){
//   res.send('It is node girls boot camp');
// });
//
// app.get('/node',function(req,res){
//   res.send('It is node boot camp');
// });
//
// app.get('/girls',function(req,res){
//   res.send('It is node girls boot camp at coder factory');
// });
