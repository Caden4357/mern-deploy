import React, {useState, useEffect} from 'react';
import axios from 'axios'
const AlbumForm = (props) => {
    const {recordList, setRecordList} = props
    const [record, setRecord] = useState({
        albumName: "",
        bandName: "",
        releaseYear: 1900,
        recordsSold: 0
    })

    const changeHandler = (e) => {
        setRecord({...record, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        // console.log(record);
        axios.post('http://localhost:8000/api/newAlbum', record ,{withCredentials:true})
            .then((res) => {
                console.log(res)
                setRecordList((originalList) => [...originalList, res.data])
            })
            .catch(err => console.log(err))
        setRecord({
            albumName: "",
            bandName: "",
            releaseYear: 1900,
            recordsSold: 0
        })
    }
    
    return (
        <div>
            <h2>Add A Record</h2>
            <form onSubmit={submitHandler} className='w-50 mx-auto'>
                <label className='form-label' htmlFor="albumName">Album Name:</label>
                <input className='form-control' value={record.albumName} type="text" name="albumName" id="albumName" onChange={changeHandler} />

                <label className='form-label' htmlFor="bandName">Artist:</label>
                <input className='form-control' value={record.bandName} type="text" name="bandName" id="bandName" onChange={changeHandler}/>

                <label className='form-label' htmlFor="releaseYear">Year Of Release:</label>
                <input className='form-control' value={record.releaseYear} type="number" name="releaseYear" id="releaseYear" onChange={changeHandler}/>

                <label className='form-label' htmlFor="recordsSold">Records Sold:</label>
                <input className='form-control' value={record.recordsSold} type="number" name="recordsSold" id="recordsSold" onChange={changeHandler}/>
                <button className='btn btn-primary'>Add</button>
            </form>
        </div>
)}

export default AlbumForm;