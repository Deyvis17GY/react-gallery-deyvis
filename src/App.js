import { Route, Switch } from "react-router-dom"

import { ImageDetail } from "./pages/ImageDetail"
import { ImageForm } from "./pages/ImageForm"
import { ImageGallery } from "./pages/ImageGallery"

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import { Navbar } from "./components/Navbar"
function App() {
  //version app
  console.log(
    `%c🚀 ~ file: App.js ~ line 13 ~ App ~ version,
    ${process.env.REACT_APP_VERSION}`,
    "font-size:12px"
  )
  return (
    <div className='bg-dark text-light'>
      <Navbar />
      <div className='container p-4'>
        <Switch>
          <Route exact path='/' component={ImageGallery} />
          <Route path='/upload' component={ImageForm} />
          <Route path='/images/:id' component={ImageDetail} />
        </Switch>
      </div>
    </div>
  )
}

export default App
