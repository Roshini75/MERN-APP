const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
    languageName:{
     type: String,
     unique:true,
     trim : true,
     minlength : 3,
     required: [true, 'language name is  required'],
    },
   rating:{
    type: Number,
    required: [true, 'rating is  required'],
    trim : true,
    maxLength : 1

   }
});

var error;
const Language = mongoose.model('Language', languageSchema);
var language = new Language();
 error = language.validateSync();

module.exports = Language;