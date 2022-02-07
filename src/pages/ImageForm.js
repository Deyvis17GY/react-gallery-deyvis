import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { baseHttps } from "../utils/data"
import Compressor from "compressorjs"
import Notify from "simple-notify"
import "simple-notify/dist/simple-notify.min.css"

export const ImageForm = () => {
  const [file, setFile] = useState()
  const [title, setTitle] = useState("")
  const [uploadImage, setUploadImage] = useState(0)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleChange = (event) => {
    const fileSelected = event.target.files[0]

    setFile(fileSelected)
  }

  const pushNotify = (title = "upload successfully ", status = "success") => {
    new Notify({
      status,
      title,
      text: "",
      effect: "slide",
      speed: 300,
      customClass: "color-text",
      customIcon: null,
      showIcon: true,
      showCloseButton: false,
      autoclose: true,
      autotimeout: 1000,
      gap: 20,
      distance: 20,
      type: 2,
      position: "bottom x-center",
      customWrapper: ""
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"]

    try {
      setLoading(true)
      if (!file) {
        setLoading(false)
        pushNotify("Please select an image", "error")
        return
      }
      const fileType = file.type

      if (!validExtensions.includes(fileType)) {
        setLoading(false)
        pushNotify("Please select a valid image file", "error")
        return
      }
      new Compressor(file, {
        quality: 0.5,
        async success(result) {
          const newFile = new File([result], result.name, {
            type: result.type,
            lastModified: Date.now(),
            size: result.size
          })

          formData.append("image", newFile)
          formData.append("title", title)
          const response = await baseHttps.post(
            `/api/images/upload`,
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

          if (response.status === 200) {
            setLoading(false)
            pushNotify()
            history.push("/")
          }
        },
        error(err) {
          console.error(err.message)
          pushNotify(err.message, "error")
        }
      })
    } catch (error) {
      console.error(error)
    }
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
              <button
                disabled={loading}
                className='btn btn-success rounded-0 w-100'
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
