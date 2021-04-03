import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import FileUploadButton from './PortalComponents/FileUploadButton'

const BUCKET = 'resume-testing-ats'
const REGION = 'us-east-2'

const PortalSubmission = () => {

    const { id } = useParams();

    const [listingsInfo, setListingsInfo] = useState([]);
    const [appInfo, setAppInfo] = useState({});
    const [resumeFile, setResumeFile] = useState();
    const [resumeName, setResumeName] = useState("");
    const [imageFile, setImageFile] = useState();
    const [imageName, setImageName] = useState("");
    const [videoFile, setVideoFile] = useState();
    const [videoName, setVideoName] = useState("");

    // [Title to be shown, id of title for database]
    const requiredFields = [
        ["First name", "firstName"],
        ["Last name", "lastName"],
        ["BU Email address", "email"],
        ["Phone number", "phone"],
        ["Expected year of graduation", "gradYear"],
        ["Major", "major"]
    ]

    const optionalFields = [
        ["LinkedIn Profile", "linkedin"],
        ["Website/Portfolio", "website"]
    ]

    const selectFields = [
        ["How did you hear about PCT?", "marketing"]
    ]

    // Function to change state of file and filename
    const handleResumeUpload = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0]);

        // Conditional to check if user cancels uploading
        if (event.target.files[0] === null) {
            return;
        }
        const name = event.target.files[0]["name"];

        setResumeFile(data);
        setResumeName(name);
        const link = "https://" + BUCKET + ".s3." + REGION + ".amazonaws.com/" + id + "/resume/" + name
        setAppInfo(prevState => {
            var newObj = {};
            newObj["resume"] = link;
            return Object.assign({}, prevState, newObj);
        });
        return;
    }

    // Function to change state of file and filename
    const handleImageUpload = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0]);

        // Conditional to check if user cancels uploading
        if (event.target.files[0] === null) {
            return;
        }
        const name = event.target.files[0]["name"];

        setImageFile(data);
        setImageName(name);
        const link = "https://" + BUCKET + ".s3." + REGION + ".amazonaws.com/" + id + "/profile-pic/" + name
        setAppInfo(prevState => {
            var newObj = {};
            newObj["image"] = link;
            return Object.assign({}, prevState, newObj);
        });
        return;

    }

    // Function to change state of file and filename
    const handleVideoUpload = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0]);

        // Conditional to check if user cancels uploading
        if (event.target.files[0] === null) {
            return;
        }
        const name = event.target.files[0]["name"];

        setVideoFile(data);
        setVideoName(name);
        const link = "https://" + BUCKET + ".s3." + REGION + ".amazonaws.com/" + id + "/elevator-pitch/" + name
        setAppInfo(prevState => {
            var newObj = {};
            newObj["video"] = link;
            return Object.assign({}, prevState, newObj);
        });
        return;
    }

    const uploadAllFiles = async () => {
        const resumeLink = await axios.post("http://127.0.0.1:5000/user/portal/upload-resume/" + id, resumeFile);
        const imageLink = await axios.post("http://127.0.0.1:5000/user/portal/upload-image/" + id, imageFile);
        const videoLink = await axios.post("http://127.0.0.1:5000/user/portal/upload-video/" + id, videoFile);
        return [resumeLink, imageLink, videoLink]
    }

    // Function to submit resume, photo, video, then file
    const handleSubmission = async () => {
        await uploadAllFiles()
            .then(() => {
                axios.post("http://127.0.0.1:5000/user/portal/submit/" + id, appInfo);
            })
        return;
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
        (
            listingsInfo &&
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
                                required="true"
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
                    <FileUploadButton
                        function={handleResumeUpload}
                        textField={resumeName}
                    />

                    <FieldText>
                        Please attach a picture of yourself*
                </FieldText>
                    <FileUploadButton
                        function={handleImageUpload}
                        textField={imageName}
                    />

                    <FieldText>
                        Elevator Pitch*
                </FieldText>
                    <FileUploadButton
                        function={handleVideoUpload}
                        textField={videoName}
                    />

                    {listingsInfo["essay"].map((text) => (
                        <TextFieldStyled>
                            <FieldText>
                                {text}
                            </FieldText>
                            <TextField
                                id="outlined-full-width"
                                fullWidth
                                variant="outlined"
                            />
                        </TextFieldStyled>
                    ))}

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

export default PortalSubmission;