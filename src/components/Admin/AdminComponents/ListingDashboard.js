import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EqualizerIcon from '@material-ui/icons/Equalizer';

import BackgroundOverlay from "../../BackgroundOverlay";
import AlertDialog from "./AlertDialog";

import axios from "axios";

const ListingsDashboard = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listingData, setListingData] = useState([]);
  const [toDeleteRowId, setToDeleteRowId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getPostings();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "title", label: "Job Name", minWidth: 100 },
    { id: "_id", label: "Job No.", minWidth: 80 },
    // { id: "type", label: "Type", minWidth: 30 },
    { id: "deadline", label: "Deadline", minWidth: 60 },
    // { id: "applicants_num", label: "Applications", minWidth: 20 },
    { id: "status", label: "Public", minWidth: 20 },
    { id: "edit", label: "Edit Options", minWidth: 20 },
    { id: "stats", label: "Stats", minWidth: 20 },
  ];

  //get postings data
  function getPostings() {
    axios
      .get(process.env.REACT_APP_FLASK_SERVER + "admin/postings", {})
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return data.allPostings;
      })
      .then((data) => {
        var i = 0;
        data.map((x) => (x["id"] = i++));
        return data;
      })
      .then((rows) => {
        setListingData(rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const rows = listingData;


  //checkbox color
  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      "&$checked": {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  // Open alert dialog
  const handleDialogOpen = (id) => {
    setToDeleteRowId(id);
    setIsOpen(true);
  };
  // Close alert dialog only
  const handleDialogCancel = () => {
    setIsOpen(false);
  };
  // Close alert dialog and delete listing
  const handleDialogConfirm = (idd) => {
    deleteListing(idd);
    setIsOpen(false);
  };

  //delete functionality
  const deleteListing = (idd) => {
    // Calls Delete API call to delete posting based on button click
    axios
      .delete(process.env.REACT_APP_FLASK_SERVER + "admin/postings/" + idd)
      .then(
        // Force reloads page in order to re-render the listings
        () => window.location.reload()
      );
    return;
  };

  return (
    <Container>
      <BackgroundOverlay color="#FEFCFF"/>
      <Title>Job Postings</Title>
      <br></br>
    
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color: "#371842" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const isName = column.id === "title";
                      const isStatus = column.id === "status";
                      const isEdit = column.id === "edit";
                      const isStats = column.id === "stats";
                      return (
                        <TableCell
                          style={{
                            color: isName ? "#833A9E" : "#61486A",
                            fontWeight: isName ? "bold" : "normal",
                          }}
                          key={column.id}
                          align={column.align}
                        >
                          {
                            isStats ? (
                              <div>
                                <EqualizerIcon
                                  style={{cursor: "pointer"}}
                                    onClick={() =>
                                      (window.location.href =
                                        "/admin/listing/" + row._id + "/statistics")
                                    }>
                                </EqualizerIcon>
                              </div>
                            ) :
                            isStatus ? (
                              <GreenCheckbox
                                checked={Boolean(row["isVisible"])}
                              ></GreenCheckbox>
                            ) : isEdit ? (
                              <div>
                                <EditIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    (window.location.href =
                                      "/admin/listing/" + row._id)
                                  }
                                ></EditIcon>
                                <DeleteIcon
                                  onClick={() => handleDialogOpen(row._id)}
                                  style={{
                                    paddingLeft: "2px",
                                    cursor: "pointer",
                                  }}
                                ></DeleteIcon>
                                <AlertDialog
                                  isOpen={isOpen}
                                  handleCancel={handleDialogCancel}
                                  handleConfirm={() =>
                                    handleDialogConfirm(toDeleteRowId)
                                  }
                                  title="Delete this listing?"
                                ></AlertDialog>
                              </div>
                            ) : (
                              <Link
                                to={{
                                  pathname:
                                    "/admin/listing/" + row._id + "/applicant",
                                  state: {
                                    jobTitle: row.title,
                                  },
                                }}
                                style={{ textDecoration: "none" }}
                              >
                                {value}
                              </Link>
                            ) /* {column.format && typeof value === 'number' ? column.format(value) : value} */
                          }
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
  );
};

const Container = styled.div`
  width: 100%;
  padding: 81px 91px 2px 91px;
  flex-direction: container;
`;

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: #873ca2; /* Accent Purple */
`;

export default ListingsDashboard;
