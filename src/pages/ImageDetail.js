import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExpand, faCompress } from "@fortawesome/free-solid-svg-icons"
import { baseHttps } from "../utils/data"

export const ImageDetail = () => {
  const params = useParams()
  const history = useHistory()
  const [image, setImage] = useState({
    title: "",
    url: "",
    _id: ""
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [classImage, setClassImage] = useState("container_image")
  const [isFullScreen, setIsFullScreen] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await baseHttps.delete(`/api/images/${params.id}`)
    setIsDeleting(false)
    history.push("/")
  }

  const screenSize = () => {
    setIsFullScreen(!isFullScreen)
    setClassImage(
      classImage === "container_image"
        ? "container_fullscreen"
        : "container_image"
    )
  }

  useEffect(() => {
    ;(async () => {
      const res = await baseHttps.get(`/api/images/${params.id}`)
      setImage(res.data)
      setIsLoading(true)
    })()
  }, [params.id])

  return (
    <div className='container_detail card bg-dark'>
      <div className={classImage}>
        {isLoading ? (
          <img src={image.url} alt={image.title} className='imgDetail' />
        ) : (
          <p className='text-center'>Loading...</p>
        )}
        {isLoading && (
          <FontAwesomeIcon
            onClick={screenSize}
            className={isFullScreen ? "compress" : "fullscreen"}
            icon={isFullScreen ? faCompress : faExpand}
          />
        )}
      </div>
      <div className='card-body w-100'>
        <h3 className="text-center">{image.title}</h3>
        <button
          disabled={isDeleting}
          className='btn btn-outline-danger'
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
