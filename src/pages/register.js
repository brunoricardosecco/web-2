import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useAuth } from '../hooks/auth';

import { Container, Input } from '../styles/pages/register';

function Register() {
  const [inputWithError, setInputWithError] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    isAdmin: false,
  });
  const { register, isLoading } = useAuth();
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !inputs.name ||
      !inputs.email ||
      !inputs.password ||
      !inputs.passwordConfirmation
    ) {
      setInputWithError(true);
      return;
    }

    if (inputs.password !== inputs.passwordConfirmation) {
      toast.warn('Your password and password confirmation need to be equals');
      setInputWithError(true);
      return;
    }
    register(inputs);
  };

  const onHandleChangeValue = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
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
        <Input
          inputWithError={inputWithError}
          type="password"
          name="passwordConfirmation"
          placeholder="Password confirmation"
          value={inputs.passwordConfirmation}
          onChange={(e) => {
            setInputWithError(false);
            onHandleChangeValue(e);
          }}
        />
        <div>
          <Input
            inputWithError={inputWithError}
            type="checkbox"
            name="isAdmin"
            id="isAdmin"
            placeholder="Password confirmation"
            value={inputs.isAdmin}
            onChange={(e) => {
              setInputWithError(false);
              onHandleChangeValue({
                target: {
                  name: 'isAdmin',
                  value: e.target.checked,
                },
              });
            }}
          />
          <label htmlFor="isAdmin">is admin?</label>
        </div>
        <button type="submit">{!isLoading ? 'SignUp' : 'Loading...'}</button>
        <button type="button" onClick={() => router.back()}>
          Back
        </button>
      </form>
    </Container>
  );
}

export default Register;
