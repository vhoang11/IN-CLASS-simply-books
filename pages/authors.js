import React, { useEffect, useState } from 'react';
import { getAuthors } from '../api/authorData';
import AuthorCard from '../components/AuthorCard';
import { useAuth } from '../utils/context/authContext';

export default function ShowAuthors() {
  const [authors, setAuthors] = useState([]);
  const { user } = useAuth();

  const getAllAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };

  useEffect(() => {
    getAllAuthors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-wrap">{authors.map((author) => (
      <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllAuthors} />
    ))}
    </div>
  );
}
