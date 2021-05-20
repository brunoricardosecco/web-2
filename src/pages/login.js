import { useState } from 'react';

import { useAuth } from '../hooks/auth';

import { Container, Input } from '../styles/pages/login';

function Login({ characters }) {
  const [charactersList, setCharactersList] = useState(characters);
  const [inputWithError, setInputWithError] = useState(false);
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const { authenticate, isLoading } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password) {
      setInputWithError(true);
      return;
    }

    console.log({ inputs });
    authenticate(inputs);
  };

  const onHandleChangeValue = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <Input
          inputWithError={inputWithError}
          type="text"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={(e) => {
            setInputWithError(false);
            onHandleChangeValue(e);
          }}
        />
        <Input
          inputWithError={inputWithError}
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={(e) => {
            setInputWithError(false);
            onHandleChangeValue(e);
          }}
        />
        <button type="submit">{!isLoading ? 'Login' : 'Loading...'}</button>
      </form>
    </Container>
  );
}

export default Login;
