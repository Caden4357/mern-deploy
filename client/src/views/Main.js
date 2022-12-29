import React, {useEffect, useState} from 'react';
import AlbumForm from '../components/AlbumForm';
import DisplayAlbum from '../components/DisplayAlbums';
import Nav from '../components/Nav';
import {useNavigate} from 'react-router-dom'


const Main = (props) => {
    const navigate = useNavigate()
    const [recordList, setRecordList] = useState([])
    const {userId, setUserId} = props

    useEffect(() => {
        if (!userId){
            navigate('/')
        }
    }, [])
    return (
        <>
            <Nav userId={userId} setUserId={setUserId}/>
            <AlbumForm recordList={recordList} setRecordList={setRecordList}/>
            <DisplayAlbum userId={userId} setUserId={setUserId} recordList={recordList} setRecordList={setRecordList}/>
        </>
)}

export default Main;