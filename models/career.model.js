const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const careerSchema = new Schema({
    serviceName:{
     type: String,
     required: true,
     trim : true,
     minlength : 3,
     required: [true, 'service name is  required'],
    },
   timePeriod:{
       type: String,
       required: [true, 'time period is  required'],
       trim : true,
       minlength : 3

   },
   roleName : {
       type: String,
       required: true,
       trim : true,
       minlength : 3,
       required: [true, 'role name is required']

   },
   roleDesc : {
    type: String,
    required: true,
    trim : true,
    minlength : 3,
    required: [true, 'role Desc is required']

  } 
});

var error;
const Career = mongoose.model('Career', careerSchema);
var career = new Career();
 error = career.validateSync();

module.exports = Career;