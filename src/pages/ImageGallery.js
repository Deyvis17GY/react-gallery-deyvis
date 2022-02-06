import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { baseHttps } from "../utils/data"
export const ImageGallery = () => {
  const [images, setImages] = useState([])

  const history = useHistory()
  useEffect(() => {
    ;(async () => {
      const res = await baseHttps.get(`/api/images`)
      res ? setImages(res.data) : setImages([])
    })()
  }, [])
  console.log(images)
  return images && images.length > 0 ? (
    <div className='container-image'>
      {images.map((image, index) => (
        <div
          className='container-image-item'
          key={index}
          onClick={() => history.push(`/images/${image._id}`)}
        >
          {/* <h6 className='card-title'>{image.title}</h6> */}
          <img
            title={image.title}
            src={image.url}
            alt={image.title}
            className='w-100'
          />
        </div>
      ))}
    </div>
  ) : (
    <h2>Loading...</h2>
  )
}
