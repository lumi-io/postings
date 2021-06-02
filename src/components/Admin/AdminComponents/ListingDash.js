import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

// import SearchBar from "material-ui-search-bar";


import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';

import axios from 'axios';


const ListingsDashboard = (props) => {

    let { id } = useParams();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [listingData, setListingData] = useState([]);

    useEffect(() => {
        getPostings();
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        { id: 'title', label: 'Job Name', minWidth: 100 },
        { id: '_id', label: 'Job No.', minWidth: 80 },
        { id: 'type', label: 'Type', minWidth: 60 },
        { id: 'deadline', label: 'Deadline', minWidth: 60 },
        { id: 'applicants_num', label: 'Applications', minWidth: 20 },
    ];

    useEffect(() => {
        getPostings();
    }, []);

    //get postings data
    function getPostings() {
        axios.get(process.env.REACT_APP_FLASK_SERVER + "admin/postings", {
        })
            .then(res => {
                return res.data;
            })
            .then(data => {
                return data.allPostings;
            })
            .then(data => {
                var i = 0;
                data.map(x => x["id"] = i++);
                return data
            })
            .then(rows => {
                setListingData(rows);
            })
            .catch(err => {
                console.log(err);
            })
    }

    
    const useStyles = makeStyles((theme) => ({
        root: {
            margin: theme.spacing(1),
            width: '10ch',
        },
      }));
      
    const classes = useStyles;
    const rows = listingData;

    //choose filter
    const [option, setOption] = React.useState('');
    const handleChange = (event) => {
        setOption(event.target.value);
    };

    const BootstrapInput = withStyles((theme) => ({
        root: {
          'label + &': {
            marginTop: theme.spacing(3),
          },
        },
        input: {
          borderRadius: 4,
          position: 'relative',
          backgroundColor: theme.palette.background.paper,
          border: '1px solid #ced4da',
          fontSize: 16,
          padding: '10px 26px 10px 12px',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          // Use the system font instead of the default Roboto font.
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
          '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
          },
        },
      }))(InputBase);

    return (
        <Container>
            <Title>Job Postings</Title>
            <br></br>
            <Box style={{paddingBottom: "10px"}} display="flex">
                <Box flexGrow={1}>
                <TextField style={{ width: "500px", height: "30px", paddingBottom: "30px"}} label="Search Job" variant="outlined" />
                </Box>
                <Box>
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={option}
                        style={{ width: "200px", paddingLeft: "50px"}}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value={"recent"}>Most Recent</MenuItem>
                        <MenuItem value={"application"}>Application Num</MenuItem>
                        <MenuItem value={"type"}>Type</MenuItem>
                    </Select>
                </Box>
            </Box>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, color: "#371842"}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        const isName = (column.id === "title")
                                        console.log(isName)
                                        return (
                                            <TableCell style={{color: isName ? "#833A9E" : "#61486A", fontWeight: isName ? "bold" : "normal"}} key={column.id} align={column.align} onClick={() => window.location.href = "/admin/listing/" + row._id} >
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
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

export default ListingsDashboard;