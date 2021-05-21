import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  h1 {
    font-size: 1.5vw;
    color: #fff;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
      'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-bottom: 10px;
  }

  > form {
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;

    input:nth-child(1n) {
      margin-bottom: 10px;
    }

    button {
      background-color: ${(props) => props.theme.colors.primary};
      padding: 10px;
      width: 30%;
      border: 0;
      font-size: 1.5vw;
      border-radius: 10px;
      margin-bottom: 10px;
    }

    button:nth-of-type(1) {
      background-color: ${(props) =>
        props.haveFile ? 'green' : props.theme.colors.primary};
      color: ${(props) => (props.haveFile ? '#FFF' : '#000')};
    }
  }
`;

export const Input = styled.input`
  width: 30%;
  padding: 10px;
  font-size: 1.5vw;
  border-radius: 10px;
  border: 1px solid transparent;

  ${(props) =>
    props.inputWithError &&
    css`
      border: 2px solid red;
    `}
`;
