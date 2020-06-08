const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/user.model');
const Profile = require('../models/profile.model');
const Education = require('../models/education.model');
const Career = require('../models/career.model');
const Skill = require('../models/skills.model');
const Language = require('../models/language.model');

const signToken = userID => {
   return JWT.sign({
       iss :  "roshiniTadi",
       sub : userID 
   }, "roshiniTadi", {expiresIn : "24h"});
}


userRouter.post('/registration' , (req,res) =>{
   const { name, email, mobile, username, password,address } = req.body;
   const role = "user";
   const newUser = new User({name, email, mobile, username, password,address,role});
   newUser.save().then(()=>res.json({msg:"User registered successfully!"})).
   catch(err=>res.status(400).json({error:true, errMsg:err}));
});


userRouter.get('/', (req,res)=>{
      User.find()
      .then((users)=>res.json(users))
      .catch(err=>res.status(400).json('Error '+err));
});

userRouter.post('/login' , passport.authenticate('local' , {session: false}), (req,res)=>{
   if(req.isAuthenticated()){
       const {_id, username, role} = req.user;
       const token = signToken(_id);
       res.cookie('access_token', token, {sameSite : true});
       res.status(200).json({isAuthenticated : true, user :{username,role},access_token:token});
  }
});

userRouter.get('/logout' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true);
   res.clearCookie('access_token');
   res.json({user : {username :"",role:""},success:true});
});

//post the profile data
userRouter.post('/profile' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   const profile = new Profile(req.body);
   profile.save((err)=>{
      if(err){
         res.status(400).json('Error '+err);
      }
      else{
         res.json("the profile data posted successfully");
      }
   });
});

//post the updated profile data
userRouter.post('/profileUpdate' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   //res.setHeader('Access-Control-Allow-Methods', 'POST');
   Profile.findByIdAndUpdate(
      {_id: req.body._id},
      {roleDesc : req.body.roleDesc,
      name : req.body.name,
      age : req.body.age,
      location : req.body.location
      },
      {new : true},
      (err, profile)=>{
       if(err){
          res.status(400).json("Error "+err);
       }
       else{
          res.send(profile);
       }
    });
});

//get the profile data
userRouter.get('/profileData' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true);
   Profile.findOne().exec((err,document) =>{
      if(err){
         res.status(400).json('Error '+err);
      }
      else{
         res.status(200).json({profile:document, authenticated:true });
      }
   });
});

// post the education data
userRouter.post('/education' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   const education = new Education(req.body);
   education.save((err)=>{
      if(err){
         res.status(400).json('Error '+err);
      }
      else{
        res.json("the profile data posted successfully");
      }
   });
});

//post the updated education data
userRouter.post('/educationUpdate' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   Education.findByIdAndUpdate(
      {_id: req.body._id},
      {univName : req.body.univName,
      timePeriod : req.body.timePeriod,
      courseName : req.body.courseName,
      courseDesc : req.body.courseDesc
      },
      {new : true},
      (err, education)=>{
       if(err){
          res.status(400).json("Error "+err);
       }
       else{
          res.send(education);
       }
    });
});

// delete education data
userRouter.delete('/educationDelete' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   Education.findByIdAndRemove(
      {_id: req.body._id},
      (err, education)=>{
       if(err){
          res.status(400).json("Error "+err);
       }
       else{
         res.send({
            message : "education deleted",
            name: education.univName
         });
       }
    });
});

// get the education data
userRouter.get('/educationData' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true);
   Education.find().exec((err,document)=>{
      if(err){
         res.status(400).json('Error '+err);
      }
      else{
         console.log(req.user);
         res.status(200).json({education:document, authenticated:true });
         //console.log(document);
      }
   });
});

// post the career data
userRouter.post('/career' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true);
   const career = new Career(req.body);
   career.save((err)=>{
      if(err){
         res.status(400).json('Error '+err);
      }
      else{
        res.json("Career data posted successfully!");
      }
  });
});

// post the updated career data
userRouter.post('/careerUpdate' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   Career.findByIdAndUpdate(
      {_id: req.body._id},
      {serviceName : req.body.serviceName,
      timePeriod : req.body.timePeriod,
      roleName : req.body.roleName,
      roleDesc : req.body.roleDesc
      },
      {new : true},
      (err, career)=>{
       if(err){
          res.status(400).json("Error "+err);
       }
       else{
          res.send(career);
       }
    });
});

//delete the career data
userRouter.delete('/careerDelete' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   Career.findByIdAndRemove(
      {_id: req.body._id},
      (err, career)=>{
       if(err){
          res.status(400).json("Error "+err);
       }
       else{
         res.send({
            message : "career deleted",
            name: career.serviceName
         });
       }
    });
});

// get the career data
userRouter.get('/careerData' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true);
   Career.find().exec((err,document)=>{
      if(err){
         res.status(400).json('Error '+err);
      }
      else{
         console.log(req.user);
         res.status(200).json({career:document, authenticated:true });
         //console.log(document);
      }
   });
});

userRouter.post('/skill' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   const skill = new Skill(req.body);
   skill.save((err)=>{
      if(err){
         res.status(400).json('Error '+err);
      }
      else{
        res.json("Skill data posted successfully!");
      }
   });
});

userRouter.post('/skillUpdate' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   Skill.findByIdAndUpdate(
      {_id: req.body._id},
      {skillName : req.body.skillName,
      rating : req.body.rating,
      },
      {new : true},
      (err, skill)=>{
       if(err){
          res.status(400).json("Error "+err);
       }
       else{
          res.send(skill);
       }
    });
});

userRouter.delete('/skillDelete' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   Skill.findByIdAndRemove(
      {_id: req.body._id},
      (err, skill)=>{
       if(err){
          res.status(400).json("Error "+err);
       }
       else{
          res.send({
             message : "skill deleted",
             name: skill.skillName
          });
       }
    });
});

userRouter.get('/skillData' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   Skill.find().exec((err,document)=>{
      if(err){
         res.status(400).json('Error '+err);
      }
      else{
         console.log(req.user);
         res.status(200).json({skill:document, authenticated:true });
         //console.log(document);
      }
   });
});

userRouter.post('/language' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   const language = new Language(req.body);
   language.save((err)=>{
      if(err){
         res.status(400).json('Error '+err);
      }
      else{
         res.json("Language data posted successfully!");
      }
   });
});

userRouter.post('/languageUpdate' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   Language.findByIdAndUpdate(
      {_id: req.body._id},
      {languageName : req.body.languageName,
      rating : req.body.rating,
      },
      {new : true},
      (err, language)=>{
       if(err){
          res.status(400).json("Error "+err);
       }
       else{
          res.send(language);
       }
    });
});

userRouter.delete('/languageDelete' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   Language.findByIdAndRemove(
      {_id: req.body._id},
      (err, language)=>{
       if(err){
          res.status(400).json("Error "+err);
       }
       else{
          res.send({
             message : "language deleted",
             name: language.languageName
          });
       }
    });
});

userRouter.get('/languageData' , passport.authenticate('jwt' , {session: false}), (req,res)=>{
   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
   res.setHeader('Access-Control-Allow-Credentials',true); 
   Language.find().exec((err,document)=>{
      if(err){
         res.status(400).json('Error '+err);
      }
      else{
         console.log(req.user);
         res.status(200).json({language:document, authenticated:true });
         console.log(document);
      }
   });
});


userRouter.get('/authenticate' , passport.authenticate('jwt' , {session: false}), (req,res)=>{ 
   User.findById({_id : req.user._id}).populate('language').exec((err,document)=>{
      if(err){
         res.status(400).json('Error '+err);
      }
      else{
         console.log(req.user);
         res.status(200).json({username:document.username,role:document.role, authenticated:true });
         console.log(document);
      }
   });
});


module.exports = userRouter;