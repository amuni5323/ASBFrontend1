import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Backbutton from "../Components/Home/Backbutton";

const CreateBooks = () => {
    const [base64, setBase64] = useState("");

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const usernameLocal = localStorage.getItem('token');
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setBase64(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
    const handleSavebook = () => {
        if (!title || !author || !publishYear || !base64) {
            enqueueSnackbar("All fields are required", { variant: "error" });
            return;
        }

      

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('publishYear', publishYear);
        formData.append('image', base64);
      
        console.log("form data ",formData)

        axios
            .post('https://backend-book-499o.onrender.com/books', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${usernameLocal}`
                },
            })
            .then(() => {
                enqueueSnackbar("Book created successfully");
                navigate('/home');
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar("Failed to create book", { variant: "error" });
            });
    };




    return (
        <div className="p-4">

            <Backbutton />
            <h1 className="my-4">Create Books</h1>
            <div className="p-4">
                <div>
          
    </div>
                <div className="my-4">
                    <label className="mx-4">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mx-5 px-4 py-2"
                    />
                </div>
                <div className="my-4">
                    <label className="mx-2">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="mx-4 px-4 py-2"
                    />
                </div>
                <div className="my-4">
                    <label className="mx-2">Publish Year</label>
                    <input
                        type="number"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className="mx-4 px-4 py-2"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <button className="btn btn-primary btn-lg" onClick={handleSavebook}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default CreateBooks;
