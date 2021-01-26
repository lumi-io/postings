import React from 'react'
import Sidebar from './Sidebar'
import ApplicantInfo from './Main/ApplicantInfo'
import styled from 'styled-components';

const Applicant = () => {
    return (
        <Container>
            <Sidebar />
            <ApplicantInfo />
        </Container>
    )
}

const Container = styled.div`
  background: #FEFCFF;
  top:0;
  left:0;
  bottom:0;
  right:0;
  display:flex;
  height:100%;
  width:100%;
  position: absolute;
`;

export default Applicant;