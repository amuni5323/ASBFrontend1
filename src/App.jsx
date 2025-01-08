
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import CreateBooks from "./Pages/CreateBooks"
import ShowBook from "./Pages/ShowBook"
import EditBook from "./Pages/EditBook"
import Deletebooks from "./Pages/Deletebooks"
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"

const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/home' element={<Home/>} />
    <Route path="/" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path='/books/create' element={<CreateBooks />} />
    <Route path='/books/details/:id' element={< ShowBook />} />
    <Route path="/books/edit/:id" element={<EditBook/>} />
    <Route path="/books/delete/:id" element={<Deletebooks/>}/>

   
   </Routes>
   </BrowserRouter>
  )
}

export default App;
