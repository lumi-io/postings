import React from "react";
// import Sidebar from "../Sidebar/Sidebar";
import CreateListingView from "./components/CreateListingView";

import { useAuth0 } from "@auth0/auth0-react";

import MaterialUiSidebar from "../MaterialUiSidebar/MaterialUiSidebar"
import {AdminViewContainer} from "../Common/Styles"

const CreateListing = (props) => {
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
        <MaterialUiSidebar name={user.name}/>
        <CreateListingView />
      </AdminViewContainer>
    )
  );
};

export default CreateListing;
