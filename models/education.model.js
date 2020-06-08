const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    univName:{
     type: String,
     required: true,
     trim : true,
     minlength : 3,
     required: [true, 'University name is  required'],
    },
   timePeriod:{
       type: String,
       required: [true, 'time period is  required'],
       trim : true,
       minlength : 3

   },
   courseName : {
       type: String,
       required: true,
       trim : true,
       minlength : 3,
       required: [true, 'course name is required']

   },
   courseDesc : {
    type: String,
    required: true,
    trim : true,
    minlength : 3,
    required: [true, 'course Desc is required']

  } 
});

var error;
const Education = mongoose.model('Education', educationSchema);
var education = new Education();
 error = education.validateSync();

module.exports = Education;