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

import axios from 'axios';





const ApplicantDashboard = () => {
    // const classes = useStyles();

    let { id } = useParams();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [applicantData, setApplicantData] = useState([]);

    useEffect(() => {
        getApplicantData();
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'gradYear', label: 'Grad\u00a0Year', minWidth: 10 },
        { id: 'gpa', label: 'GPA', minWidth: 10 },
        { id: 'college', label: 'College', minWidth: 20 },
        { id: 'major', label: 'Major', minWidth: 100 },
      ];
      
      function createData(name, code, population, size) {
        const density = population / size;
        return { name, code, population, size, density };
      }


      function getApplicantData() {
        axios.get("http://127.0.0.1:5000/admin/postings/" + id + "/applications")
            .then(res => {
                return res.data;
            })
            .then(data => {
                if (data["status"]) {
                    return data["application"]["applications"];
                } 
                
                else {
                    console.log("err")
                }
            })
            .then(applications => {
                let modifiedData = applications.map(
                    app => ({
                        name: app["name"], 
                        gradYear: app["gradYear"], 
                        gpa: app["gpa"], 
                        college: app["college"], 
                        major: app["major"],
                        applicantId: app["applicantId"]
                    })
                )
                console.log(modifiedData);
                setApplicantData(modifiedData);
                return;
            })
            .catch(err => {
                console.log(err);
            })
    }
      
      const rows = applicantData;

    return (
        <Container>
            <Title>Applicants Dashboard</Title>
            <br></br>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
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
                                        return (
                                            <TableCell key={column.id} align={column.align} onClick={() => window.location.href="applicant/" + row.applicantId} >
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

export default ApplicantDashboard;