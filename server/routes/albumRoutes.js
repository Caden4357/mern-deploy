const albumController = require('../controllers/album.controller')
const { authenticate } = require('../config/jwt.config')
module.exports = (app) => {
    app.get('/api/allAlbums', authenticate, albumController.allAlbums),
    app.post('/api/newAlbum', authenticate, albumController.createNewAlbum),
    app.get('/api/oneAlbum/:id', authenticate, albumController.getOneAlbum),
    app.delete('/api/deleteAlbum/:id', authenticate, albumController.deleteAlbum),
    app.put('/api/updateAlbum/:id', authenticate, albumController.updateAlbum)
}