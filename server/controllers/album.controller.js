const Album = require('../models/album')
const jwt = require('jsonwebtoken');
module.exports = {

    index: (req,res) => {
        res.json({message:"Hello From The Backend 👽"})
    },

    allAlbums: (req, res) => {
        Album.find().collation({locale:'en', strength:2}).sort({albumName:1})
            .then((allAlbums) => {
                res.json(allAlbums)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },
    getOneAlbum: (req, res) => {
        Album.findById({_id: req.params.id})
            .then(album => res.json({album:album}))
            .catch(err => console.log(err))
    },
    createNewAlbum: (req, res) => {
        const album = new Album(req.body)
        const decodedJwt = jwt.decode(req.cookies.userToken, {complete:true})
        album.user_id = decodedJwt.payload._id
        album.createdByUser = decodedJwt.payload.name
        Album.create(album)
            .then((newAlbum) => {
                res.json(newAlbum)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },
    updateAlbum: (req, res) => {
        Album.findOneAndUpdate(
                {_id:req.params.id}, 
                req.body, 
                {new:true, runValidators:true}
            )
            .then(updatedAlbum => 
                res.json({album:updatedAlbum})
            )
            .catch((err) => {
                res.json({message:"Something went wrong", error:err})
            })
    },
    deleteAlbum: (req, res) => {
        Album.deleteOne({_id: req.params.id})
            .then(result => {
                res.json({result: result})
            })
            .catch((err) => {
                res.json({message:"something went wrong", error:err})
            })
    }
}