const express = require('express');
const app = express();

// install session module first using 'npm install express-session'
var session = require('express-session'); 
app.use(session({ secret: 'happy jungle', 
                  resave: false, 
                  saveUninitialized: false, 
                  cookie: { maxAge: 60000 }}))

app.get('/', display);                  
app.get('/sort', sort);
app.get('/add', add);
app.get('/remove', remove);
app.get('/clear', clear); 
app.listen(process.env.PORT,  process.env.IP, startHandler())
function startHandler()
{
  console.log('Server listening on port ' + process.env.PORT);
}


//////////////////////////////////////////////////////////// 
function display(req, res)
{
  let result = {};
  //let songs = req.session.songs = [];
  req.session.songs || []; 
  try
  {
    result = {'Songs' : req.session.songs};
  }
  catch(e)
  {
    result = {'error' : e.message};
  }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end('');
}
///////////////////////////////////////////////////////////
function sort(req, res)
{
  let result = {};
 
  try
  {
    if(req.session.songs == undefined || req.session.songs.length <= 0)
      throw Error("There are no songs");
    result = {'Songs' : req.session.songs.sort()};
  }
  catch (e)
  {
    result = {'error' : e.message};
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
  res.end('');
}
/////////////////////////////////////////////////////////
function add(req, res)
{
  let result = {};
  
  try
  {
    if (req.query.song == undefined || req.query.song.length <= 0)  
      throw Error("Expecting a song");
    else
      for(let i = 0; i < req.session.songs.length; i++)
      {
        if(req.session.songs[i] == req.query.song)
        throw Error("Song Already is in list");
      }
      req.session.songs.push(req.query.song);
      result = {'Songs' : req.session.songs};
  }
  catch(e)
  {
    result = {'error' : e.message};
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
  res.end('');
}
//////////////////////////////////////////////////////////
function remove(req, res)
{
  let result = {};
  try
  {
    if (req.query.song == undefined || req.query.song.length <= 0)  
      throw Error("Expecting a song");
    else if(req.session.songs.length == 0)
      throw Error("The song list is empty");
    else
    {
      req.session.songs.pop(req.query.song);
      result = {'Songs' : req.session.songs}; 
    } 
  }
  catch(e)
  {
    result = {'error' : e.message};
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
  res.end('');
}
////////////////////////////////////////////////////////////////
function clear(req, res)
{
  let result = {};
  try
  {
    if (req.session.songs == undefined || req.session.songs.length <= 0)  
      throw Error("Song list already Empty");
    
    while(req.session.songs.length > 0)
      req.session.songs.pop();
    
    result = {'Songs' : req.session.songs};
  }
  catch(e)
  {
    result = {'error' : e.message};
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
  res.end('');
} 
