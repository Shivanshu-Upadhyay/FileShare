import axios from 'axios'
import React, { useState } from 'react'
import download from 'downloadjs'
import {useParams} from 'react-router-dom'
import baseUrl from './config'
import { useEffect } from 'react'

function Download() {
  const {uuid} = useParams()
  const [fileDetail,setFileDetail] = useState('')
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
 useEffect(()=>{
  const fetchFile = async()=>{
    setLoading(true)
    const {data} =  await axios.get(`${baseUrl}/api/getfile/${uuid}`)
    setFileDetail(data.foundFile);
    setLoading(false)
  }
  fetchFile()
 },[])
  
const downloadFIle = async(e)=>{
  e.preventDefault()
  setLoading2(true);
  const {data} =  await axios.get(`${baseUrl}/api/file/download/${uuid}`,{responseType:"blob"})
  download(data) 
  setLoading2(false);
}
  return (
    <div className="uploadSection">
    <div className="container">
      <div className="card">
        <div className="card-container" style={{border:"none",cursor:"default"}} >
          <lottie-player
            src="https://assets2.lottiefiles.com/private_files/lf30_y2ryub2r.json"
            background="transparent"
            speed="1"
            style={{ width: "250px", height: "250px" }}
            loop
            autoplay
          />
        </div>
        <form className="card-form">
        <div className='fileDownloadeBox'>
        {loading? <span className="loader"></span>:<div className='fileDownloadeBox'>
        <h5 className="card-heading" >{fileDetail?.fileName}</h5>
        <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_6gadk1by.json"
                background="transparent"
                speed="1"
                style={{ width: "50px", height: "50px" }}
                loop
                autoplay
              />
              <h5 className="card-heading">{Math.round(fileDetail?.size/1000)}kb</h5>
        </div>}
        
        </div>
        
          <div className="action">
            <a href='#/' className="action-button" onClick={downloadFIle} download>
            {loading2? <span className="loader2">Downloading</span>:"Download File"}
              <lottie-player
                src="https://assets5.lottiefiles.com/private_files/lf30_a5ghwfwe.json"
                background="transparent"
                speed="1"
                style={{ width: "40px", height: "40px" }}
                loop
                autoplay
              />
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Download