const mongoose = require('mongoose');
const User = require('./User')



const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    ingridiënts: {
        type: String,
        required: true
    },
     
    preparation: {
        type: String,
        required: true
    },

    time: {
        type: Number,
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    }
}, {timestamps: true})


const Recipe = mongoose.model('recipe', RecipeSchema)

module.exports = Recipe