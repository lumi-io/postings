import React from "react";
import ListingsDashboard from "./AdminComponents/ListingDashboard";

import { useAuth0 } from "@auth0/auth0-react";

import { AdminViewContainer } from "./Common/Styles";
import MaterialUiSidebar from "./MaterialUiSidebar/MaterialUiSidebar";

const Listings = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    isAuthenticated && (
      <AdminViewContainer>
        <MaterialUiSidebar name={user.name} />
        <ListingsDashboard />
      </AdminViewContainer>
    )
  );
};

export default Listings;
