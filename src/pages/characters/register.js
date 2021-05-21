import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { createCharacter } from '../../services/characters';

import { Container, Input } from '../../styles/pages/register';

function RegisterCharacter() {
  const [inputWithError, setInputWithError] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const imageRef = useRef(null);

  const onSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      if (!inputs.name || !inputs.nickname || !inputs.file) {
        setInputWithError(true);
        return;
      }

      const formData = new FormData();

      formData.append('name', inputs.name);
      formData.append('nickname', inputs.nickname);
      formData.append('image', inputs.file);

      await createCharacter(formData);
      toast.success('Character created!');
      setInputs({
        name: '',
        nickname: '',
        file: null,
      });
      setInputWithError(false);
    } catch (error) {
      toast.error('Error to create character');
    } finally {
      setIsLoading(false);
    }
  };

  const onHandleChangeValue = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleChangeImage = (file) => {
    setInputs({
      ...inputs,
      file: file.target.files[0],
    });
  };

  return (
    <Container haveFile={inputs.file !== null}>
      <h1>SignUp</h1>
      <form onSubmit={onSubmit}>
        <Input
          inputWithError={inputWithError}
          type="text"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={(e) => {
            setInputWithError(false);
            onHandleChangeValue(e);
          }}
        />
        <Input
          inputWithError={inputWithError}
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={inputs.nickname}
          onChange={(e) => {
            setInputWithError(false);
            onHandleChangeValue(e);
          }}
        />
        <button type="button" onClick={() => imageRef.current.click()}>
          {!inputs.file ? 'Select a photo' : inputs.file.name}
        </button>
        <input
          type="file"
          accept="image/*"
          id="upload-button"
          style={{ display: 'none' }}
          ref={imageRef}
          onChange={onHandleChangeImage}
        />
        <button type="submit">
          {!isLoading ? 'Register character' : 'Loading...'}
        </button>
        <button type="button" onClick={() => router.push('/characters')}>
          Back
        </button>
      </form>
    </Container>
  );
}

export default RegisterCharacter;
