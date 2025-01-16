
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ConfirmEmail from "./Pages/ConfirmEmail"
import CreateBooks from "./Pages/CreateBooks"
import Deletebooks from "./Pages/Deletebooks"
import EditBook from "./Pages/EditBook"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import ShowBook from "./Pages/ShowBook"
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
    <Route path="/confirm-email/:token" element={<ConfirmEmail />} />

   
   </Routes>
   </BrowserRouter>
  )
}

export default App;
