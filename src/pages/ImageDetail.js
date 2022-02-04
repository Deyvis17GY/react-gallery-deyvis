import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router"
export const ImageDetail = () => {
  const params = useParams()
  const history = useHistory()
  const [image, setImage] = useState({
    title: "",
    url: "",
    _id: ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    await axios.delete(`/api/images/${params.id}`)
    history.push("/")
  }

  useEffect(() => {
    ;(async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/images/${params.id}`
      )
      setImage(res.data)
      setIsLoading(true)
    })()
  }, [params.id])

  return (
    <div className='row'>
      <div className='col-md-4 offset-md-4'>
        <div className='card bg-dark'>
          {isLoading ? (
            <img src={image.url} alt={image.title} className='img-fluid' />
          ) : (
            <p className='text-center'>Loading...</p>
          )}
          <div className='card-body'>
            <h3>{image.title}</h3>
            <button className='btn btn-outline-danger' onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
