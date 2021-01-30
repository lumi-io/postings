import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Job Name', width: 400 },
    { field: 'location', headerName: 'Location', width: 200}
];

const Listings = () => {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        getPostings(rows);
    }, []);
    
    const getPostings = posts => {
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
            setRows(rows);
        })
        .catch(err => {
            console.log("API Error");
        })
    }
    
    return (
        <Container>
            <Title>Listings</Title>
            <ListingRow>
                <div style={{ height: 380, width: '100%' }}>
                    <StyledGrid rows={rows} columns={columns} />
                </div>
            </ListingRow>
        </Container>
    )
}

const StyledGrid = styled(DataGrid)`
    background-color: #F9F6F9
`;

const ListingRow = styled.div`
    padding: 40px 0px 40px 0px;
`;

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

export default Listings;