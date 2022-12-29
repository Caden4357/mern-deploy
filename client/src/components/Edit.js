import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = (props) => {
    const [record, setRecord] = useState({
        albumName: "",
        bandName: "",
        releaseYear: 1900,
        recordsSold: 0
    })
    const {id} = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/oneAlbum/'+id, {withCredentials:true})
            .then(res => setRecord(res.data.album))
            .catch(err => console.log(err))
    }, [])
    const changeHandler = (e) => {
        setRecord({...record, [e.target.name]: e.target.value})
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/updateAlbum/' + id, record, {withCredentials:true})
            .then((res) => {
                navigate('/home')
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h2>Edit Record</h2>
            <form onSubmit={submitHandler} className='w-50 mx-auto'>
                <label className='form-label' htmlFor="albumName">Album Name:</label>
                <input className='form-control' value={record.albumName} type="text" name="albumName" id="albumName" onChange={changeHandler} />

                <label className='form-label' htmlFor="bandName">Artist:</label>
                <input className='form-control' value={record.bandName} type="text" name="bandName" id="bandName" onChange={changeHandler}/>

                <label className='form-label' htmlFor="releaseYear">Year Of Release:</label>
                <input className='form-control' value={record.releaseYear} type="number" name="releaseYear" id="releaseYear" onChange={changeHandler}/>

                <label className='form-label' htmlFor="recordsSold">Records Sold:</label>
                <input className='form-control' value={record.recordsSold} type="number" name="recordsSold" id="recordsSold" onChange={changeHandler}/>
                <button className='btn btn-primary'>Update</button>
            </form>
        </div>
)}

export default Edit;