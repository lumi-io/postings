import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListingCard from './PortalComponents/ListingCard'
import axios from 'axios';


const Portal = () => {

    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_FLASK_SERVER + `admin/postings`)
        .then(res => {
            return res.data;
        })
        .then(data => {
            const postings = data.allPostings;
            const visiblePostings = postings.filter(posting => posting["isVisible"] === true);
            setListings(visiblePostings)
            return;
        })
        .catch(err => {
            console.log("API Error");
        })
    }, [])

    return (
        <Container>
            <ContentContainer>
                <Title style={{paddingLeft: "18px"}}>Current Openings at Phi Chi Theta</Title>
                <p style={{fontFamily: "Roboto", paddingBottom: "20px", paddingLeft: "20px"}}>Total Results ({listings.length})</p>
                {console.log(listings)}
                {listings.map(listing => (
                    <ListingCardStyled>
                        <ListingCard
                            title={listing.title}
                            id={listing._id}
                        />
                    </ListingCardStyled>
                ))}
            </ContentContainer>
        </Container>
    )

}


const Container = styled.div`
    width:100%;
    height:100%;
    background-color:#F9F6F9;
    flex-direction:container;
    margin: 0 auto;
`;

const ContentContainer = styled.div`
    padding-top: 80px;
    padding-bottom: 300px;
    padding-right: 120px;
    padding-left: 120px;
`;

const ListingCardStyled = styled.div`
    padding-top: 20px;
    padding-right: 20px;
    padding-left: 20px;
`;


const Title = styled.div`
    padding-right: 20px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    color: #873CA2; /* Accent Purple */
`;

export default Portal;