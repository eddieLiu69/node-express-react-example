var path = require('path');
var fs = require('fs');
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');

import * as React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
// import routes from './modules/routes'
var COMMENTS_FILE = path.join(__dirname, 'comments.json');

var app = express();
var apiRouter = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

apiRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

apiRouter.get('/comments', function(req, res) {    
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

apiRouter.post('/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    console.log(req.body);
    var newComment = {
      key: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});

app.use(compression());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')));

// send all requests to index.html so browserHistory in React Router works
// app.get('*', function (req, res) {
//   // and drop 'public' in the middle of here
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.get('*', (req, res) => {
//   match({ routes: routes, location: req.url }, (err, redirect, props) => {
//     // in here we can make some decisions all at once
//     if (err) {
//       // there was an error somewhere during route matching
//       res.status(500).send(err.message)
//     } else if (redirect) {
//       // we haven't talked about `onEnter` hooks on routes, but before a
//       // route is entered, it can redirect. Here we handle on the server.
//       res.redirect(redirect.pathname + redirect.search)
//     } else if (props) {
//       // if we got props then we matched a route and can render
//       const appHtml = renderToString(<RouterContext {...props}/>)
//       res.send(renderPage(appHtml))
//     } else {
//       // no errors, no redirect, we just didn't match anything
//       res.status(404).send('Not Found')
//     }
//   })
// });

app.use("/api", apiRouter);


function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
});