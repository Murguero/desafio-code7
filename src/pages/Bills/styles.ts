import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;

`;

export const Section = styled.div``;

export const Dividas = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    /* width: 100%; */
    height: 50px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    margin-top: 8px;
    position: relative;

    border: 1px solid #D3E2E5;

    strong {
      color: #999591;
    }

    span {
      margin-left: 20px;
      display: flex;
      align-items: center;
      color: #999591;
    }

    button {
      border: 0;
      background: #FFFFFF;
      margin-left: 20px;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const Form = styled.form`
  width: 750px;
  .div-form {
    margin: 30px auto;

    background: #FFFFFF;
    border: 1px solid #D3E2E5;

    padding: 48px 64px;

    overflow: hidden;

  }
  fieldset {
    border: 0;
  }

  .input-block {
    margin-top: 7px;

    label {
      display: flex;
      color: #8FA7B3;
      margin-bottom: 8px;
      line-height: 24px;
    }
    
    input {
      width: 100%;
      height: 64px;
      padding: 0 16px;
      border: 1px solid #cccccc;
      border-radius: 4px;
      outline: none;

      box-sizing: border-box;
      
    }
  }

  .novo-button {
    float: right;

    width: 100px;
    height: 50px;

    font-weight: 300;
    border-radius: 8px;
    border: 0;
    background: #12a454;
    color: #fff;

    &:hover {
        color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const Footer = styled.section`
  margin-top: 24px;
  float: right;

  display: flex;
  justify-content: center;
  align-items: center;

  .excluir-button {
    margin-right: 24px;
    width: 80px;
    height: 30px;

    font-weight: 300;
    border-radius: 8px;
    border: 0;
    background: #c53030;
    color: #fff;

    &:hover {
        color: ${shade(0.2, '#f4ede8')};
    }
  }

  .salvar-button {
    width: 80px;
    height: 30px;
    
    font-weight: 300;
    border-radius: 8px;
    border: 0;
    background: #12a454;
    color: #fff;

    &:hover {
        color: ${shade(0.2, '#f4ede8')};
    }
  }
`;
