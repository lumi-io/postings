import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';


const PortalSubmission = () => {

    const { id } = useParams();

    const [listingsInfo, setListingsInfo] = useState([]);
    const [appInfo, setAppInfo] = useState({});

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
        "Resume/CV",
        "How did you hear about PCT?"
    ]


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
                        <TextField
                            required
                            id="outlined-full-width"
                            fullWidth
                            label={text[0]}
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
                        <TextField
                            id="outlined-full-width"
                            fullWidth
                            label={text[0]}
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
                {selectFields.map((text) => (
                    <TextFieldStyled>
                        <TextField
                            id="outlined-full-width"
                            fullWidth
                            label={text}
                            variant="outlined"
                        />
                    </TextFieldStyled>
                ))}
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
    padding-right: 180px;
    padding-left: 180px;
    background:#F9F6F9;
`;

const SubmissionContainer = styled.div`
    padding-top: 80px;
    padding-bottom: 80px;
    padding-right: 180px;
    padding-left: 180px;
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

export default PortalSubmission;