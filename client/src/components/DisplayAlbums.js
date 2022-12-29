import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
const DisplayAlbum = (props) => {
    const {userId, setUserId, recordList, setRecordList} = props

    useEffect(() => {
        axios.get('http://localhost:8000/api/allAlbums' , {withCredentials:true})
            .then(res => setRecordList(res.data))
            .catch(err => console.log(err))
    }, [])
    const removeFromDom = albumId => {
        setRecordList(recordList.filter(album => album._id !== albumId))
    }
    const deleteAlbum = (id) =>{
        axios.delete('http://localhost:8000/api/deleteAlbum/' + id, {withCredentials:true})
            .then(res => removeFromDom(id))
            .catch(err=>console.log(err))
    }
    return (
        <div>

            <h2>All Records:</h2>
            <div className='d-flex flex-wrap justify-content-evenly'>
                {
                    recordList?
                    recordList.sort((a,b) => a.albumName.localeCompare(b.albumName)).map((record) => (
                        <div className='border border-dark m-5'>
                            <h2>{record.albumName}</h2>
                            <h2>By: {record.bandName}</h2>
                            <h3>Added by: {record.createdByUser}</h3>
                            <Link to={`/album/${record._id}`} className='btn btn-secondary'>Click to view more information</Link>
                            {
                                record.user_id === userId?
                                <>
                                    <button className='btn btn-danger' onClick={() => deleteAlbum(record._id)}>Delete</button>
                                    <Link to={`/edit/${record._id}`} className='btn btn-success'>Edit</Link>
                                </>:
                                null

                            }
                        </div>
                    )):
                    null
                }
            </div>
        </div>
)}

export default DisplayAlbum;