//Budget API

const express = require('express');
const cors = require('cors');
const app = express();

// const path = require('path');
// const jwt = require('jsonwebtoken');
// const exjwt = require('express-jwt');

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Headers','Content-type,Authorization');
//     next();
// });




const port = 3000;

// const secretKey = 'My super secret key';
// const jwtMW = exjwt({
//     secret:secretKey,
//     algorithms: ['HS256']
// });
// let users = [
//     {
//         id: 1,
//         username: 'amulya',
//         password: '123'
//     },
//     {
//         id:2,
//         username:'venkatapathi',
//         password: '456' 
//     }   
// ];

const mongoose = require('mongoose');
const personal_budget_Model = require('./models/personal_Budget');
const users = require('./models/users');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/',express.static('public'));

app.use(cors());

//var budget = require('./budget.json');


// app.get('/budget',(req,res) => {
//     res.send(budget);
// });

app.get('/budget', (req, res) => {
    mongoose.connect('mongodb://127.0.0.1:27017/budget_database', {
     useNewUrlParser:true,
     useCreateIndex : true,
     useUnifiedTopology: true
    }).then(() => {
        personal_budget_Model.find({}).then((output) => {
            console.log("output is ",output);
            res.send(output);
            mongoose.connection.close();
        })
    })
 });

 
app.get('/user', (req, res) => {
    mongoose.connect('mongodb://127.0.0.1:27017/budget_database', {
     useNewUrlParser:true,
     useCreateIndex : true,
     useUnifiedTopology: true
    }).then(() => {
        users.find({}).then((output) => {
            console.log("output is ",output);
            res.send(output);
            mongoose.connection.close();
        })
    })
 });
 app.post('/register', (req, res) => {
     let userdata;
     console.log("***************** entered post method of /register")
    let data = {firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username,password: req.body.password,id: req.body.id}
    mongoose.connect('mongodb://127.0.0.1:27017/budget_database', {
        useNewUrlParser:true,
        useCreateIndex : true,
        useUnifiedTopology: true
       }).then( () => {
           
        users.find({username:data.username}).then((output) => {
            console.log("output is ",output);
            if(output){
                console.log("&&&&&&&&&&&& entered");
                // return 'Username "' + data.username + '" is already taken'
                // return next(new Error('Username "' + data.username + '" is already taken'));
               // return this.error('Username "' + user.username + '" is already taken')
            }
            
        }).then(()=>{
            users.find({}).then((output) => {
                console.log("output is ",output);
                userdata = output;
                console.log("&&&&&&&&&&&&& userdata",userdata);
                data.id = userdata.length?Math.max(...userdata.map(x=>x.id))+1:1;
        
                    console.log("^^^^^^^^^^^ id ",data.id);
                })


        .then(()=>{
                users.insertMany(data, (error, newDataentered) => {
                    console.log(newDataentered);
                    console.log(data);
                       if(newDataentered) {
                           res.send(newDataentered);
                       } else {
                        res.send(error);
                       }
                         mongoose.connection.close();
                   })
            })
        })
       })

})
app.post('/add', (req, res) => {
    let userbudgetdata;
    console.log("***************** entered post method of /add")
   let data = {username: req.body.username, title: req.body.title, budget: req.body.budget,color: req.body.color,id: req.body.id}
   mongoose.connect('mongodb://127.0.0.1:27017/budget_database', {
       useNewUrlParser:true,
       useCreateIndex : true,
       useUnifiedTopology: true
      }).then( () => {
          
       personal_budget_Model.find({title:data.title}).then((output) => {
           console.log("output is ",output);
           if(output){
               console.log("&&&&&&&&&&&& entered");
               // return 'Username "' + data.username + '" is already taken'
               // return next(new Error('Username "' + data.username + '" is already taken'));
              // return this.error('Username "' + user.username + '" is already taken')
           }
           
       }).then(()=>{
           personal_budget_Model.find({}).then((output) => {
               console.log("output is ",output);
               userbudgetdata = output;
               console.log("&&&&&&&&&&&&& budget data of user",userbudgetdata);
               data.id = userbudgetdata.length?Math.max(...userbudgetdata.map(x=>x.id))+1:1;
       
                   console.log("^^^^^^^^^^^ id ",data.id);
               })


       .then(()=>{
               personal_budget_Model.insertMany(data, (error, newDataentered) => {
                   console.log(newDataentered);
                   console.log(data);
                      if(newDataentered) {
                          res.send(newDataentered);
                      } else {
                       res.send(error);
                      }
                        mongoose.connection.close();
                  })
           })
       })
      })

})

app.post('/login',(req,res)=>{
    
    const username = req.body.username;
    const password = req.body.password;

    mongoose.connect('mongodb://127.0.0.1:27017/budget_database', {
        useNewUrlParser:true,
        useCreateIndex : true,
        useUnifiedTopology: true
       }).then(() => {
           users.find({username:username,password:password}).then((output) => {
               console.log("output is ********************",output);
               res.send(output);
               mongoose.connection.close();
           })
       }) 

})


 app.post('/budget', (req, res) => {
    let data = {id: req.body.id, title: req.body.title, budget: req.body.budget, color: req.body.color}
    mongoose.connect('mongodb://127.0.0.1:27017/budget_database', {
        useNewUrlParser:true,
        useCreateIndex : true,
        useUnifiedTopology: true
       }).then( () => {
           personal_budget_Model.insertMany(data, (error, newDataentered) => {
            console.log(newDataentered);
            console.log(data);
               if(newDataentered) {
                   res.send(newDataentered);
               } else {
                res.send(error);
               }
               mongoose.connection.close();
           })
       })
})


// app.post('/api/login',(req,res)=>{
//     const {username,password} = req.body;
//     let foundUser = false;
//     for(let user of users) {
//         if(username === user.username && password === user.password) {
//             let token = jwt.sign({id:user.id,username:user.username},secretKey,{expiresIn: 180});
//             foundUser = true;
//             res.json({
//                 success: true,
//                 err:null,
//                 token
//             });
//             break;
//         }   
//     }

//     if (!foundUser) {
//         res.status(401).json({
//             success:false,
//             token:null,
//             err: 'Username or Password is incorrect'
//         });
//     } 
// }); 


// app.get('/api/dashboard',jwtMW,(req,res)=>{
//     res.json({
//         success:true,
//         myContent:'Secret content that only logged in people can see.'
//     });
// });

// app.get('/api/settings',jwtMW,(req,res)=>{
//     res.json({
//         success:true,
//         myContent:'settings page *********'
//     });
// });

// app.get('/', (req,res) => {
//    res.sendFile(path.join(__dirname,'../personal-budget/src/app/login/login.component.html'));
// });

// app.use(function (err,req,res,next){
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).json({
//             success: false,
//             officialError: err,
//             err:'Username or password is incorrect 2'
//         });
//     }
//     else {
//         next(err);
//     }
// });



app.listen(port,() => {
    console.log('API served at http://localhost:'+ port)
});