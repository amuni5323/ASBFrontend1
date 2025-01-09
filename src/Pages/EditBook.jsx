import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Backbutton from "../Components/Home/Backbutton"

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author , setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

useEffect(() =>{
    axios.get(`https://backend-book-499o.onrender.com/books/${id}`)
    .then((response) =>{
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title)
    }).catch((error) =>{
        alert('An error happened. Please check console')
        console.log(error);
    })
}, [])

const handleEditBook =()=>{
    const data={
        title, 
        author,
        publishYear
    };
    axios.put(`https://backend-book-499o.onrender.com/books/${id}`, data)
    .then(() =>{
        navigate('/home');
    }).catch((error) =>{
        console.log(error);
    });
}

  return (
    <div className="p-4">
    <Backbutton />
     <h1 className="my-4"> Edit Books</h1>
     <div className="p-4">
         <div className="my-4">
             <label className="mx-4">Title</label>
             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mx-5 px-4 py-2" />
         </div>
     
    <div className="my-4">
     <label className="mx-2">Author</label>
     <input type="number " value={author} onChange={(e) => setAuthor(e.target.value)} className="mx-4 px-4 py-2"  />
    </div>
    <div className="my-4">
     <label className="mx-2">Publish Year</label>
     <input type="number " value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className="mx-4 px-4 py-2"  />
    </div>
    <button className="btn btn-primary btn-lg" onClick={handleEditBook}>Eidt</button>
     </div>
 
     </div>
  )
}

export default EditBook