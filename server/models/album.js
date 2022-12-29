const mongoose = require('mongoose')

const AlbumSchema = new mongoose.Schema({

    albumName: {
        type: String,
        required: [true, 'Album name is required']
    },
    bandName: {
        type:String,
        required: [true, 'Band name is required']
    },
    recordsSold: {
        type: Number,
        required: [true, 'Records sold is required'],
        min: [0, 'Cant have negative records sold']
    },
    releaseYear: {
        type: Number 
    },

    user_id:{
        type:mongoose.Schema.Types.ObjectId,

        ref: 'User'
    },
    createdByUser:{
        type:String
    }
    // ! Want to add in would recomend boolean and genre enums
}, {timestamps: true})

const Album = mongoose.model('Album', AlbumSchema)

module.exports = Album