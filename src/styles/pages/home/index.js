import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  > ul {
    padding-top: 20px;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    width: 70%;
  }
  > form {
    width: 100%;
    justify-content: center;
    display: flex;
  }

  button {
    background-color: ${(props) => props.theme.colors.primary};
    padding: 10px;
    border: 0;
    font-size: 1.5vw;
    border-radius: 10px;
    color: #000;
  }

  button:nth-of-type(1) {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  button:nth-of-type(2) {
    position: absolute;
    top: 10px;
    left: 10px;
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

export const CardContainer = styled.div`
  width: 20%;
  -webkit-box-shadow: 0px 0px 18px 4px rgba(168, 241, 255, 1);
  -moz-box-shadow: 0px 0px 18px 4px rgba(168, 241, 255, 1);
  box-shadow: 0px 0px 18px 4px rgba(168, 241, 255, 1);
  border-radius: 10px;

  margin: 30px;
  overflow: hidden;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
    > h2 {
      font-size: 1.5vw;
      text-align: center;
    }
  }
`;
