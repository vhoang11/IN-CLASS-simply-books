import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleAuthor } from '../../../api/authorData';
import AuthorForm from '../../../components/forms/AuthorForm';

export default function EditAuthor() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [editAuthor, setEditAuthor] = useState({});

  // TODO: make a call to the API to get the author data
  useEffect(() => {
    getSingleAuthor(firebaseKey).then(setEditAuthor);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<AuthorForm obj={editAuthor} key={firebaseKey} />);
}
