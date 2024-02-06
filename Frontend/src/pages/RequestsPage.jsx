import "../styles/RequestsPage.css";
import Button from "@mui/material/Button";
import * as React from "react";
import RequestsPageTable from "../components/RequestsPageTable";
import { ClientMenuList } from "../components/Menu";
import { useLocation } from 'react-router-dom';

function RequestsPage() {
  const { uid } = useLocation().state;

  return (
    <>
      <div id="title-container">
        <h1 id="title" style={{ color: "#ffa70f", margin: "0" }}>
          היסטוריית בקשות
        </h1>
        <div id="button-container">
          <Button variant="contained" id="open-new-request-button">
            פתיחת בקשה חדשה
          </Button>
          <ClientMenuList uid={uid} />
        </div>
      </div>
      <div id="requests-page-content">
        <RequestsPageTable />
      </div>
    </>
  );
}

export default RequestsPage;
