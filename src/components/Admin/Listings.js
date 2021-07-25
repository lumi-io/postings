import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import ListingsDashboard from './AdminComponents/ListingDashboard'
import styled from 'styled-components';

import { useAuth0 } from "@auth0/auth0-react";


const Listings = () => {

    const { user, isAuthenticated, isLoading, error } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    return (
        ( 
            isAuthenticated &&
            <Container>
                <Sidebar 
                    name = {user.name}
                />
                <ListingsDashboard />
            </Container>
        )
    )
}

const Container = styled.div`
  background: #FEFCFF;
  top:0;
  left:0;
  bottom:0;
  right:0;
  display:flex;
  height:100%;
  width:100%;
  position: absolute;
`;

export default Listings;