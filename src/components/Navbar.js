import React, { useRef } from "react"
import { Link } from "react-router-dom"

export const Navbar = () => {
  const navbar = useRef(null)

  const showNavbar = () => {
    navbar.current.classList.toggle("show")
  }
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            React Gallery
          </Link>
          <button onClick={showNavbar} className='navbar-toggler'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            ref={navbar}
            className='collapse navbar-collapse show'
            id='navbarNav'
          >
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/upload'
                >
                  Upload an Image
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
