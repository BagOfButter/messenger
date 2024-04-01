import styled from 'styled-components';

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
`;

export const StyledFormLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 120px;
`;

export const StyledFormField = styled.div`
    font-weight: bold;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    color: #042A62;
`;

export const StyledFormInput = styled.input`
    font-family: 'Noto Sans', sans-serif;
    font-size: 16px;
    color: #042A62;
    border: 1px solid #042A62;
    border-radius: 5px;
    width: 240px;
    height: 30px;
    margin-top: 5px;
`;

export const StyledFormError = styled.p`
    color: red;
`;

export const StyledSubmitButton = styled.button`
    font-family: 'Noto Sans', sans-serif;
    font-size: 28px;
    color: #FFFFFF;
    background-color: #075E9D;
    border: none;
    border-radius: 5px;
    padding: 5px 25px 5px 25px;
    margin: 15px;
    cursor: pointer;

    &:hover {
        background-color: #042A62;
    }
`;

export const StyledAuthChangeButton = styled.a`
    font-family: 'Noto Sans', sans-serif;
    text-decoration: none;
    color: #075E9D;
    cursor: pointer;

    &:hover {
        color: #042A62;
        text-decoration: underline;
    }
`;