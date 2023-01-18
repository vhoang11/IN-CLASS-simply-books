import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createAuthor, updateAuthor } from '../../api/authorData';

const initialAuthorState = {
  email: '',
  image: '',
  first_name: '',
  last_name: '',
  favorite: false,
};

function AuthorForm({ obj }) {
  const [authorInput, setAuthorInput] = useState(initialAuthorState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setAuthorInput(obj);
  }, [obj]);

  const handleAuthorChange = (e) => {
    const { name, value } = e.target;
    setAuthorInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAuthor(authorInput)
        .then(() => router.push(`/author/${obj.firebaseKey}`));
    } else {
      const payload = { ...authorInput, uid: user.uid };
      createAuthor(payload).then(() => {
        router.push('/authors');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      {/* AUTHOR FIRST NAME  */}
      <FloatingLabel controlId="floatingInput1" label="Author First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Author First Name"
          name="first_name"
          value={authorInput.first_name}
          onChange={handleAuthorChange}
          required
        />
      </FloatingLabel>

      {/* AUTHOR LAST NAME  */}
      <FloatingLabel controlId="floatingInput2" label="Author Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Author Last Name"
          name="last_name"
          value={authorInput.last_name}
          onChange={handleAuthorChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Author Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={authorInput.image}
          onChange={handleAuthorChange}
          required
        />
      </FloatingLabel>

      {/* EMAIL INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Author Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Author Email"
          name="email"
          value={authorInput.email}
          onChange={handleAuthorChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={authorInput.favorite}
        onChange={(e) => {
          setAuthorInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Author</Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    email: PropTypes.string,
    image: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

AuthorForm.defaultProps = {
  obj: initialAuthorState,
};

export default AuthorForm;
