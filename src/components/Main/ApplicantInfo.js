import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const ApplicantInfo = () => {

    
    return (
        <Container>
        <Title>Applicant Information</Title>
        </Container>
    )
}


const Container = styled.div`
    width:100%;
    height:100%;
    padding: 81px 91px 2px 91px;
    flex-direction:container;
`;

const Title = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    color: #873CA2; /* Accent Purple */
`;

export default ApplicantInfo;