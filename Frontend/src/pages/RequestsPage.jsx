import "../styles/RequestsPage.css";
import Button from "@mui/material/Button";
import * as React from "react";
import { useLocation } from "react-router-dom";
import RequestsPageTable from "../components/RequestsPageTable";
import { ClientMenuList } from "../components/Menu";
import OpenTaskPage from "../components/OpenTasks";

function RequestsPage() {
  const { uid } = useLocation().state;

  return (
    <>
      <div id="title-container">
        <h1 id="title" style={{ color: "#000000", margin: "0" }}>
          היסטוריית בקשות
        </h1>
        <div id="button-container">
          <OpenTaskPage />
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
