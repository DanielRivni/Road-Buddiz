import "../styles/RequestsPage.css";
import * as React from "react";
import RequestsPageTable from "../components/RequestsPageTable";
import { ClientMenuList } from "../components/Menu";
import OpenTaskPage from "../components/OpenTasks";

function RequestsPage() {

  return (
    <>
      <div id="title-container">
        <h1 id="title" style={{ color: "#000000", margin: "0" }}>
          היסטוריית בקשות
        </h1>
        <div id="button-container">
          <OpenTaskPage/>
          <ClientMenuList/>
        </div>
      </div>
      <div id="requests-page-content">
        <RequestsPageTable/>
      </div>
    </>
  );
}

export default RequestsPage;
