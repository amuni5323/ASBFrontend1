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
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const usernameLocal = localStorage.getItem('token');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }else {
        enqueueSnackbar("Please upload a valid image file", { variant: "error" });
      }
    }
  };

  const handleSaveBook = async () => {
    if (!title || !author || !publishYear || !base64) {
      enqueueSnackbar("All fields are required", { variant: "error" });
      return;
    }

    try {
      const response = await axios.post(
        'https://backend-book-499o.onrender.com/book',
        {
          title,
          author,
          publishYear,
          image: base64, // Pass Base64 string
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usernameLocal}`,
          },
        }
      );
      enqueueSnackbar("Book created successfully", { variant: "success" });
      
      navigate('/home');
    } catch (error) {
      console.error("Error creating book:", error.response || error);
      enqueueSnackbar("Failed to create book", { variant: "error" });
    }
  };

  return (
    <div className="p-4">
      <Backbutton />
      <h1 className="my-4">Create Books</h1>
      <div className="p-4">
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
        <button className="btn btn-primary btn-lg" onClick={handleSaveBook}  disabled={!title || !author || !publishYear || !base64}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
