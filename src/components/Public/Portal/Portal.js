import React, { useState, useEffect } from "react";
import axios from "axios";

import ListingCard from "./components/ListingCard";
import BackgroundOverlay from "../../BackgroundOverlay";

import { Container, ContentContainer, ListingCardStyled, Title } from "./helpers/Style";
import PCTlogo from "./PCTlogo.png"

const Portal = () => {
  const [listings, setListings] = useState([]);

  const dateTime = (date) => {
    return date.substring(0, 10);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_FLASK_SERVER + `admin/postings`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        const postings = data.allPostings;
        //convert the time
        var d = new Date();
        var month = "-0" + (d.getMonth() + 1);
        var date = "-0" + d.getDate();
        if (d.getMonth() > 8) {
          month = "-" + (d.getMonth() + 1);
        }
        if (d.getDate() > 9) {
          date = "-" + d.getDate();
        }
        var formattedDate = d.getFullYear() + month + date;
        const visiblePostings = postings.filter(
          (posting) =>
            posting["isVisible"] === true &&
            dateTime(posting["deadline"]) >= formattedDate
        );
        setListings(visiblePostings);
        return;
      })
      .catch((err) => {
        console.log("API Error");
      });
  }, []);

  return (
    <Container>
      <BackgroundOverlay color="#f9f6f9"/>
      <ContentContainer>
        <img src={PCTlogo} 
             alt="PCT Logo" 
             style={{
               display:"block",
               marginLeft:"auto",
               marginRight:"auto",
               width:"25%",
               height:"25%"
               }}
        /> 
        <Title style={{ paddingLeft: "18px", textAlign:"center" }}>
          Current Openings at Phi Chi Theta
        </Title>
        <p
          style={{
            fontFamily: "Arial",
            paddingBottom: "20px",
            paddingLeft: "20px",
            textAlign:'center'
          }}
        >
          Total Results ({listings.length})
        </p>
        <div
        style={{
          display: 'flex',
          flexDirection: 'horizontal',
          justifyContent: 'center'
        }}
        >
          {console.log(listings)}
          {listings.map((listing) => (
            <ListingCardStyled>
              <ListingCard title={listing.title} id={listing._id} deadline={listing.deadline} />
            </ListingCardStyled>
          ))}
        </div>
      </ContentContainer>
    </Container>
  );
};

export default Portal;



