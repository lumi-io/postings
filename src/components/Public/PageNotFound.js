import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage = () => {
    return (<div style={{textAlign:"center"}}>
        <Title style={{paddingTop: "40px"}}>404 Page Not Found</Title>
            <p>
              <Link to="/">Go to Home </Link>
            </p>
        </div>)
}

const Title = styled.div`
    padding-right: 20px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    color: #873CA2; /* Accent Purple */
`;

export default NotFoundPage