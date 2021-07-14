import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import EssayBox from './EssayBox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const ApplicantInfoField = () => {


    let { id, applicantId } = useParams();

    const [applicantData, setApplicantData] = useState({});
    const [hasMinor, setHasMinor] = useState(false);

    useEffect(() => {
        getApplicantData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getApplicantData() {
        axios.get(process.env.REACT_APP_FLASK_SERVER + "admin/postings/" + id + "/applications/" + applicantId)
            .then(res => {
                console.log(res);
                return res.data;
            })
            .then(data => {
                if (data["status"]) {
                    return data["application"];
                } else {
                    console.log("err")
                }
            })
            .then(application => {
                setApplicantData(application);
                if (application["minor"] !== "") setHasMinor(true);
                return;
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Container>
            <Grid container spacing={1}>
                <Grid item xs={11}>
                    <Title>Applicant Information</Title>
                </Grid>
                <Grid item xs={1}>
                    <BackIcon onClick={() => window.location.href = "http://localhost:3000/admin/listing/" + id + "/applicant"}>
                        <ArrowBackIosIcon></ArrowBackIosIcon>
                    </BackIcon>
                </Grid>
            </Grid>
            <br></br>
            <br></br>
            <Grid container spacing={5}>
                <Grid item xs={3} wrap='nowrap'>
                    <img
                        src={applicantData["img"]}
                        alt="new"
                        style={{ width: '100%', height: '100%' }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <NameTitle>{applicantData["name"]}</NameTitle>
                    <InfoSubtitle>Email: {applicantData["email"]} </InfoSubtitle>
                    <InfoSubtitle>Phone: {applicantData["phone"]} </InfoSubtitle>
                    <InfoSubtitle>Year: {applicantData["gradYear"]} </InfoSubtitle>
                    <InfoSubtitle>Major: {applicantData["major"]} </InfoSubtitle>
                    {
                        hasMinor
                            ? <InfoSubtitle>Minor: {applicantData["minor"]} </InfoSubtitle>
                            : <InfoSubtitle>Minor: None </InfoSubtitle>
                    }
                    <InfoSubtitle>GPA: {applicantData["gpa"]}</InfoSubtitle>
                </Grid>
                <Grid item xs={5}>
                    <InfoSubtitle>LinkedIn: {applicantData["linkedin"]} </InfoSubtitle>
                    <InfoSubtitle>Website: {applicantData["website"]} </InfoSubtitle>
                    <InfoSubtitle>Resume: {applicantData["resume"]} </InfoSubtitle>
                    <InfoSubtitle>Ethnicity: {applicantData["ethnicity"]} </InfoSubtitle>
                    <InfoSubtitle>Gender: {applicantData["gender"]} </InfoSubtitle>
                    {/* <DescriptionOutlinedIcon></DescriptionOutlinedIcon>
                    <LinkedInIcon></LinkedInIcon> */}
                </Grid>
            </Grid>

            {
                applicantData["essay"] && applicantData["essay"].map(
                    (prompt) => (
                        <EssayBox
                            question={prompt[0]}
                            answer={prompt[1]}>
                        </EssayBox>

                    )
                )
            }

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

const BackIcon = styled.div`
    color: #873CA2;
    text-align: right;
`;


export default ApplicantInfoField;