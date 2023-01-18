import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import BookCard from '../../components/BookCard';
import { booksOnSale } from '../../api/bookData';

function BooksOnSale() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);

  const getAllBooksOnSale = () => {
    booksOnSale(user.uid).then(setBooks);
  };

  useEffect(() => {
    getAllBooksOnSale();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {books.map((book) => (
        <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllBooksOnSale} />
      ))};
    </div>
  );
}

export default BooksOnSale;
