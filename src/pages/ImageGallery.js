import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom';
export const ImageGallery = () => {

    const [images, setImages] = useState([]);
    const history = useHistory();
   
    useEffect( () => {
     (async() => {
        const res = await axios.get('/api/images');
        setImages(res.data); 
    })();
    }, [])

    return (
        <div className="row">
            {images.map((image, index) => (
                <div className="col-md-3 p-2 card-image" key={index} 
                onClick={() => history.push(`/images/${image._id}`)} >
                    <h6 className="card-title">{image.title}</h6>
                    <img src={image.url} alt={image.title} className="img-fluid" />
                </div>
            ))}
        </div>
    )
}
