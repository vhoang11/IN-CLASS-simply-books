import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import AuthorCard from '../../components/AuthorCard';
import { favoriteAuthor } from '../../api/authorData';

function BooksOnSale() {
  const { user } = useAuth();
  const [authors, setAuthors] = useState([]);

  const getAllAuthors = () => {
    favoriteAuthor(user.uid).then(setAuthors);
  };

  useEffect(() => {
    getAllAuthors();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {authors.map((author) => (
        <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllAuthors} />
      ))};
    </div>
  );
}

export default BooksOnSale;
