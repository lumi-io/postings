import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import GridList from '@material-ui/core/GridList';

import ListingCard from '../Listings/ListingCard'


const ListingsDashboard = () => {

    const [listings, setListings] = useState([]);

    useEffect(() => {
        getPostings();
    }, []);

    function getPostings() {
        axios.get(`http://127.0.0.1:5000/admin/postings`)
            .then(res => {
                console.log(res.data);
                return res.data;
            })
            .then(data => {
                console.log(data.allPostings);
                return data.allPostings;
            })
            .then(data => {
                var i = 0;
                data.map(x => x["id"] = i++);
                return data
            })
            .then(rows => {
                setListings(rows);
            })
            .catch(err => {
                console.log("API Error");
            })
    }

    return (
        <Container>
            <Title>Listings</Title>
            <GridList cols={3}>
                {listings.map(listing => (
                    <ListingCard
                        name={listing.title}
                        viewCount="2"
                        applyCount="3"
                        id={listing._id}
                    >
                    </ListingCard>
                ))}
            </GridList>
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
    padding-bottom:20px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    color: #873CA2; /* Accent Purple */
`;

export default ListingsDashboard;