import "../styles/RequestsPage.css";
import Button from "@mui/material/Button";
import * as React from "react";
import RequestsPageTable from "../components/RequestsPageTable";
import { ClientMenuList } from "../components/Menu";

function RequestsPage() {
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
          <ClientMenuList />
        </div>
      </div>
      <div id="requests-page-content">
        <RequestsPageTable />
      </div>
    </>
  );
}

export default RequestsPage;
