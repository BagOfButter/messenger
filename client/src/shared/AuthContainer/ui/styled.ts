import styled from 'styled-components';
import AuthBackground from '@assets/authbackground.svg'

export const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100vw;
    height: 100vh;
    background: url(${AuthBackground}) no-repeat center center fixed;
    background-size: cover;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFFFFC;
    border-radius: 15px;
    width: 430px;
    overflow: hidden;
`;

export const FormHeader = styled.div`
    text-align: center;
    color: #FFFFFF;
    background-color: #075E9D;
    width: 100%;
`;