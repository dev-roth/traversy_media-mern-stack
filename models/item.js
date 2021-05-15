const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Everything in Mongoose starts with a Schema. 
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const ItemSchema = new Schema({
    // _id property is added by MongoDB
    name: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

// Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. 
// Models are responsible for creating and reading documents from the underlying MongoDB database.
module.exports = Item = mongoose.model('item', ItemSchema);
