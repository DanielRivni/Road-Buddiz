import "../styles/RequestsPage.css";
import Button from "@mui/material/Button";
import * as React from "react";
import RequestsPageTable from "../components/RequestsPageTable";

function RequestsPage() {
  return (
    <>
    <div id="title-container">
        <h1 id="title" style={{ color: "#ffa70f" }}>
          היסטוריית בקשות
        </h1>
        <Button
          variant="contained"
          id="open-new-request-button"
        >
          פתיחת בקשה חדשה
        </Button>
      </div>
      <div id="requests-page-content">
         <RequestsPageTable/>
      </div>
    </>
  );
}

export default RequestsPage;
