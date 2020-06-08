const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillsSchema = new Schema({
    skillName:{
     type: String,
     required: true,
     unique:true,
     trim : true,
     minlength : 3,
     required: [true, 'skill name is  required'],
    },
   rating:{
       type: Number,
       required: [true, 'rating is  required'],
       trim : true,
       maxLength : 1

   }
});

var error;
const Skill = mongoose.model('Skill', skillsSchema);
var skill = new Skill();
 error = skill.validateSync();

module.exports = Skill;