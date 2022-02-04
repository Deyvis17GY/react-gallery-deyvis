import axios from "axios"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export const ImageForm = () => {
  const [file, setFile] = useState()
  const [title, setTitle] = useState("")
  const [uploadImage, setUploadImage] = useState(0)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append("image", file)
    formData.append("title", title)
    await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/api/images/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress(progressEvent) {
          const upload = `${Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          )}`
          setUploadImage(upload)
        }
      }
    )
    history.push("/")
  }

  return (
    <div className='col-md-4 offset-md-4'>
      <div className='card bg-dark text-light rounded-0 p-4'>
        {loading && (
          <div className='progress rounded-0'>
            <div
              className='progress-bar progress-bar-striped bg-success'
              role='progressbar'
              style={{ width: `${uploadImage}%` }}
              aria-valuenow='25'
              aria-valuemin='0'
              aria-valuemax='100'
            ></div>
          </div>
        )}

        <div className='card-body'>
          <h3 className='card-title'>Upload Image</h3>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              className='form-control bg-dark text-light my-3 rounded-0'
              placeholder='Write a title for your photo'
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type='file'
              className='form-control bg-dark text-light rounded-0'
              onChange={handleChange}
            />
            <div className='my-3'>
              <button className='btn btn-success rounded-0 w-100'>
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
