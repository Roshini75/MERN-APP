const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    roleDesc:{
     type: String,
     required: true,
     trim : true,
     minlength : 3,
     required: [true, 'role description is  required'],
    },
   name : {
       type: String,
       required: true,
       trim : true,
       minlength : 3,
       required: [true, 'User name is required']

   },
   age : {
    type: Number,
    required: true,
    trim : true,
    maxLength : 2,
    required: [true, 'Age is required']

  },
   location : {
    type: String,
    required: true,
    trim : true,
    minlength : 3,
    required: [true, 'location is required']
   }
   
});

var error;
const Profile = mongoose.model('Profile', profileSchema);
var profile = new Profile();
 error = profile.validateSync();

module.exports = Profile;