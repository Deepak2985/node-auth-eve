const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');


const dbUrl = "mongodb://testuser:testuser123@ds151024.mlab.com:51024/eventsauth";
const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 300

mongoose.connect(dbUrl, {useUnifiedTopology: true}, err => {
    if(err){
        console.log(err);
    }else{
        console.log("Connected to database.");
    }
})


router.get('/', (req, res)=> {
    res.send('route rendered..')
})

router.post('/register', (req, res)=>{
    let userData = req.body;
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    userData.password = hashedPassword;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if(error){
            console.log(error);
        }else{
            res.status(200).send({name:registeredUser.name, email:registeredUser.email});
        }
    })
})

router.post('/login', (req, res)=>{
    let userData = req.body;
User.findOne({email: userData.email}, (error, user)=>{
    if(error){
        console.log(error);
    }else {
        console.log(user)
        console.log(process.env.algorithm)
        const hashedPassword = bcrypt.hashSync(userData.password, 8)
        console.log(hashedPassword)
        if(!user || !bcrypt.compareSync(userData.password, user.password)){
            res.status(401).send("Invalid credentials.");
        }else{
            const token = jwt.sign({email:user.email} , process.env.jwtKey, {
                algorithm: process.env.algorithm,
                expiresIn: process.env.jwtExpirySeconds
              })
            res.status(200).send({token:token});
        }
    }
})
})


router.get('/events', (req, res) => {
    let events = [
            {
                "_id": "1",
                "name":"HACKWARE 2019",
                "date": "2020-11-21 10:00 AM IST",
                "description":"Schneider Electric Innovation Challenge"
            },
            {
                "_id": "2",
                "name":"THinkathon",
                "date": "2020-12-11 10:00 AM IST",
                "description":"THink42Labs Hackathon event 2019"
            },
        
            {
                "_id": "3",
                "name":"BADMchampionship",
                "date": "2021-09-11 09:00 AM IST",
                "description":" Business Analytics and Data Mining Championship 2019"
            },
            {
                
                "_id": "4",
                "name": "Cyber Disease CTF PRELIMS Round - UPES Dehradun",
                "date": "2021-12-21 12:00 AM IST",
                "description":" Ethical Hacking and Cyber Security,"
               
            }
        
    ]

    res.json(events);
})


router.get('/special-events', (req, res) => {
    let events = [
            {
                "_id": "1",
                "name":"HACKWARE 2019",
                "date": "2020-11-21 10:00 AM IST",
                "description":"Schneider Electric Innovation Challenge"
            },
            {
                "_id": "2",
                "name":"THinkathon",
                "date": "2020-12-11 10:00 AM IST",
                "description":"THink42Labs Hackathon event 2019"
            },
        
            {
                "_id": "3",
                "name":"BADMchampionship",
                "date": "2021-09-11 09:00 AM IST",
                "description":" Business Analytics and Data Mining Championship 2019"
            },
            {
                
                "_id": "4",
                "name": "Cyber Disease CTF PRELIMS Round - UPES Dehradun",
                "date": "2021-12-21 12:00 AM IST",
                "description":" Ethical Hacking and Cyber Security,"
               
            },
            {
                
                "_id": "5",
                "name": "The Tourism Shala",
                "date": "2019-12-19 01:00 AM IST",
                "description":"Increasing sustainability in the travel industry,"
               
            },
            {
                
                "_id": "6",
                "name": "SRiSHTi 2k19 National level Technical symposium",
                "date": "2022-11-08 17:00 AM IST",
                "description":"SRISHTI 2k19 is an National level technical symposium organised by IEEE Students"
               
            }
        
    ]

    res.json(events);
})




module.exports = router;