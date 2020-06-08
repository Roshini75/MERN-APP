const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:{
     type: String,
     required: true,
     trim : true,
     minlength : 3,
     validate: {
        validator: function(v) {
          return /^[a-zA-Z]+(\s{0,1}[a-zA-Z\s])*$/.test(v);
        },
        message: props => `${props.value} is not a valid Name Last name!`
      },
      required: [true, 'User Name Last name  required'],
     
   },
   email:{
       type: String,
       required: true,
       unique : [true, 'email should be unique'],
       validate: {
        validator: function(v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      },
      required: [true, 'User email address required'],
       trim : true,
       minlength : 3

   },
   mobile : {
       type: String,
       required: true,
       trim : true,
       minlength : 3,
       validate: {
        validator: function(v) {
          return /^[\+]+(\d{11,12})$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      required: [true, 'User phone number required'],

   },
   username : {
    type: String,
    required: true,
    trim : true,
    unique : [true, 'username should be unique'],
    minlength : 3,
    validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9]+$/.test(v);
        },
        message: props => `${props.value} is not a valid username!`
      },
      required: [true, 'Username is required'],

  },
   password : {
    type: String,
    required: true,
    trim : true,
    minlength : 3,
    validate: {
        validator: function(v) {
          return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/.test(v);
        },
        message: props => `${props.value} is not a valid password!`
      },
      required: [true, 'Password is required'],
   },
   address:{
    type: String,
    required: true,
    trim : true,
    minlength : 3,
    validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9\s,.'-]{3,}$/.test(v);
        },
        message: props => `${props.value} is not a valid address!`
      },
    required :[true, 'the users address is required'],
    
   },
   role :{
    type: String,
   },
}, {
  timestamps : true,  
 });
 var error;

 userSchema.pre('save', function(next){
  if(!this.isModified('password'))
      return next();
  bcrypt.hash(this.password,10, (err, passwordHash) =>{
    if(err)
       return next(err);
    this.password = passwordHash;
    next();
});
});

userSchema.methods.comparePassword = function(password, cb){
bcrypt.compare(password, this.password, (err, isMatch) =>{

  if(err)
     return cb(err);
 else{
     if(!isMatch)
         return cb(null,isMatch);
     return cb(null,this);
   }

});
}

const User = mongoose.model('User', userSchema);
var user = new User();
 error = user.validateSync();

module.exports = User;