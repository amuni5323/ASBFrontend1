import { Link } from "react-router-dom"
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import { MdOutlineDelete } from "react-icons/md"




const BooksTable = ({books}) => {
  if (!books || books.length === 0) {
    return <p>No books available.</p>;
}

  return (
    <table className=" table table-striped text-center">
        <thead>
        <tr>
            <th className="border">No</th>
            <th className="border">Title</th>
            <th className="border">Author</th>
            <th className="border">Publish Year</th>
            <th className="border">Operations</th>
        </tr>
        </thead>
        <tbody>
  {books.length > 0 ? (
    books.map((book, index) => (
      <tr key={book._id}>
        <td>{index + 1}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.publishYear}</td>
        <td>
          <div className="d-flex justify-content-center gap-3">
            <Link to={`/books/details/${book._id}`}>
              <BsInfoCircle className="mx-3" />
            </Link>
            <Link to={`/books/edit/${book._id}`}>
              <AiOutlineEdit className="mx-3" />
            </Link>
            <Link to={`/books/delete/${book._id}`}>
              <MdOutlineDelete className="mx-3" />
            </Link>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">No books available.</td>
    </tr>
  )}
</tbody>

    </table>
  )
}

export default BooksTable