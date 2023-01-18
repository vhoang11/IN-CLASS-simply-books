import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewAuthorDetails } from '../../api/mergedData';

export default function ViewBook() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();
  // const [authorBooks, setAuthorBooks] = useState([]);

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);
  // {
  //   getAuthorBooks(firebaseKey).then(setAuthorBooks);
  // }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={authorDetails.image} alt={authorDetails.first_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {authorDetails.first_name} {authorDetails.last_name}
          {authorDetails.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
        <hr />
      </div>
    </div>
  );
}
