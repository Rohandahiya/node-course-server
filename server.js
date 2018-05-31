const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;

var app=express();

hbs.registerPartials(__dirname +'/views/partials')//To register for partials.Partials are used to avoid same code in our viewd files

app.set('view engine','hbs');//To tell express that we are using a view engine named hbs

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log=`${now}:  ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>
{
  if(err)
{
  console.log('Unable to append to server.log');
}
});
  next();
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs',{
    heading:'We will be right back',
    para:"The site is currently being updated"
  });
  next();
});

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/',(req,res)=>
{
res.render('home.hbs',{
pageTitle: 'This is the home page',
messge: 'Welcome to my website'
});
});

app.get('/about',(req,res)=>
{
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad',(req,res)=>
res.send({
  errorMessage: 'You got a error message'
})
);
app.listen(port,()=>{
  console.log(`Server up on ${port}`)
  });
