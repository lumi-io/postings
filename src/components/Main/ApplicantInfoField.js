import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

const ApplicantInfoField = () => {


    let { id, applicantId } = useParams();

    const [applicantData, setApplicantData] = useState({});
    const [hasMinor, setHasMinor] = useState(false);

    useEffect(() => {
        getApplicantData();
    }, [])

    function getApplicantData() {
        axios.get("http://127.0.0.1:5000/admin/postings/" + id + "/applications/" + applicantId)
            .then(res => {
                return res.data;
            })
            .then(data => {
                if (data["status"]) {
                    return data["application"];
                }

                else {
                    console.log("err")
                }
            })
            .then(application => {
                console.log(application)
                setApplicantData(application);
                if (application["minor"] != "") setHasMinor(true);
                return;
            })
            .catch(err => {
                console.log(err);
            })
    }



    return (
        <Container>
            <Title>Applicant Information</Title>
            <br></br>
            <br></br>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    Image here
                </Grid>
                <Grid item xs={9}>
                    <NameTitle>{ applicantData["name"] }</NameTitle>
                    <InfoSubtitle>Email: { applicantData["email"] } </InfoSubtitle>
                    <InfoSubtitle>Phone: { applicantData["phone"] } </InfoSubtitle>
                    <InfoSubtitle>Year: { applicantData["gradYear"] } </InfoSubtitle>
                    <InfoSubtitle>Major: { applicantData["major"] } </InfoSubtitle>
                    { 
                        hasMinor
                        ? <InfoSubtitle>Minor: { applicantData["minor"] } </InfoSubtitle>
                        : <InfoSubtitle>Minor: None </InfoSubtitle>
                    }
                    <InfoSubtitle>GPA: { applicantData["gpa"] }</InfoSubtitle>
                </Grid>
            </Grid>
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

const NameTitle = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    padding-bottom:7px;
    /* Accent Purple */
    color: #873CA2;
`;

const InfoSubtitle = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: #61486A;
`;

export default ApplicantInfoField;