import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom'
import axios from 'axios';
const OneAlbum = (props) => {

    const [album, setAlbum] = useState({})
    const {id} = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/oneAlbum/' + id, {withCredentials:true})
            .then(res=>setAlbum(res.data.album))
            .catch(err=>console.log(err))
    }, [])
    return (
        <div>
            <Link to={'/home'}>Go Home</Link>
            {
                album?
                <>
                    <h2>Album: {album.albumName}</h2>
                    <h2>By: {album.bandName}</h2>
                    <h2>Records Sold: {album.recordsSold}</h2>
                    <h2>Release Year: {album.releaseYear}</h2>
                </>:
                null
            }
        </div>
)}

export default OneAlbum;