import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const PortalSubmission = () => {

    const { id } = useParams();

    const [listingsInfo, setListingsInfo] = useState([]);
    const [appInfo, setAppInfo] = useState({});
    const [resumeFile, setResumeFile] = useState();
    const [resumeName, setResumeName] = useState("");

    const requiredFields = [
        ["First name", "firstName"],
        ["Last name", "lastName"],
        ["Email address", "email"],
        ["Phone number", "phone"]
    ]

    const optionalFields = [
        ["LinkedIn Profile", "linkedin"],
        ["Website/Portfolio", "website"]
    ]

    const selectFields = [
        ["How did you hear about PCT?", "marketing"]
    ]

    const handleResumeUpload = (event) => {
        const data = new FormData();
        // const filedata = event.target.files
        data.append('file', event.target.files[0]);
        // data.append('fileName', event.target.files[])
        const name = event.target.files[0]["name"];

        setResumeFile(data);
        setResumeName(name);

    }

    const handleSubmission = () => {
        axios.post(
            "http://127.0.0.1:5000/upload-test",
            resumeFile
        ).then(
            axios.post(
                "http://127.0.0.1:5000/read-json",
                appInfo
            )
        )
    }


    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/admin/postings/` + id)
            .then(res => {
                return res.data;
            })
            .then(data => {
                console.log(data.postingInfo);
                setListingsInfo(data.postingInfo)
                return;
            })
            .catch(err => {
                console.log("API Error");
            })
    }, [])

    return (
        <Container>
            <ContentContainer>
                <Title>{listingsInfo["title"]}</Title>
                <Subtitle>Phi Chi Theta</Subtitle>
                <Subtitle>About Us</Subtitle>
                <ContentText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non arcu leo lobortis commodo leo fames. In dis egestas pellentesque pretium id urna. Ultrices lacus id quam ultricies urna sem eu sit. Feugiat vel consequat, egestas et aliquam non lectus at. Erat pellentesque varius facilisi mattis vivamus arcu, amet. Convallis eget vitae pellentesque quis. Quis ornare tristique in proin mauris, gravida viverra etiam purus. Natoque consectetur pellentesque sociis pulvinar. Pulvinar pretium tortor, eleifend vitae.</ContentText>
                <Subtitle>Who are we looking for</Subtitle>
                <ContentText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non arcu leo lobortis commodo leo fames. In dis egestas pellentesque pretium id urna. Ultrices lacus id quam ultricies urna sem eu sit. Feugiat vel consequat, egestas et aliquam non lectus at. Erat pellentesque varius facilisi mattis vivamus arcu, amet. Convallis eget vitae pellentesque quis. Quis ornare tristique in proin mauris, gravida viverra etiam purus. Natoque consectetur pellentesque sociis pulvinar. Pulvinar pretium tortor, eleifend vitae.</ContentText>
            </ContentContainer>
            <SubmissionContainer>
                <Title>Apply for this position</Title>
                {requiredFields.map((text) => (
                    <TextFieldStyled>
                        <FieldText>
                            {text[0]}*
                        </FieldText>
                        <TextField
                            required
                            id="outlined-full-width"
                            fullWidth
                            onChange={e => {
                                setAppInfo(prevState => {
                                    const val = e.target.value;
                                    var newObj = {};
                                    newObj[text[1]] = val;
                                    return Object.assign({}, prevState, newObj);
                                });
                                console.log(appInfo);
                            }}
                            variant="outlined"
                        />
                    </TextFieldStyled>
                ))}
                {optionalFields.map((text) => (
                    <TextFieldStyled>
                        <FieldText>
                            {text[0]}*
                        </FieldText>
                        <TextField
                            id="outlined-full-width"
                            fullWidth
                            onChange={e => {
                                setAppInfo(prevState => {
                                    const val = e.target.value;
                                    var newObj = {};
                                    newObj[text[1]] = val;
                                    return Object.assign({}, prevState, newObj);
                                });
                                console.log(appInfo);
                            }}
                            variant="outlined"
                        />
                    </TextFieldStyled>
                ))}
                <FieldText>
                    Resume/CV*
                </FieldText>
                <ButtonLayout>
                    <Button
                        variant="contained"
                        component="label"
                        style={{
                            "background-color": "#873CA2",
                            "color": "#F9F6F9"
                        }}
                    >
                        Upload File
                    <input
                            type="file"
                            hidden
                            onChange={handleResumeUpload}
                        />
                    </Button>
                    <UploadedText>
                        {resumeName}
                    </UploadedText>
                </ButtonLayout>

                {selectFields.map((text) => (
                    <TextFieldStyled>
                        <FieldText>
                            {text[0]}
                        </FieldText>
                        <TextField
                            id="outlined-full-width"
                            fullWidth
                            variant="outlined"
                        />
                    </TextFieldStyled>
                ))}
                    
                <br></br>
                <Button
                    size="large"
                    fullWidth="true"
                    variant="contained"
                    component="label"
                    style={{
                        "background-color": "#873CA2",
                        "color": "#F9F6F9"
                    }}
                    onClick={handleSubmission}
                >
                    Submit application
                </Button>
            </SubmissionContainer>
        </Container>
    )

}


const Container = styled.div`
    width:100%;
    height:100%;
    flex-direction:container;
    margin: 0 auto;
`;

const ContentContainer = styled.div`
    padding-top: 80px;
    padding-bottom: 80px;
    padding-right: 20%;
    padding-left: 20%;
    background:#F9F6F9;
`;

const SubmissionContainer = styled.div`
    padding-top: 80px;
    padding-bottom: 80px;
    padding-right: 20%;
    padding-left: 20%;
    background: background: #FEFCFF;
`;


const Title = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    color: #873CA2; /* Accent Purple */
    padding-bottom: 20px;
`;

const Subtitle = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #61486A;
    padding-top: 10px;
    padding-bottom: 10px;
`;

const ContentText = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #61486A;
    padding-top: 5px;
    padding-bottom: 10px;
`;

const TextFieldStyled = styled.div`
    padding-top: 10px;
    padding-bottom: 20px;
`;

const FieldText = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #61486A;
    padding-bottom: 10px;
`;

const ButtonLayout = styled.div`
    padding-bottom: 10px;
`;

const UploadedText = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #A8A6A8;
    padding-top:10px;
`;

export default PortalSubmission;