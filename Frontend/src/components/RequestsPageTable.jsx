import "../styles/RequestsPage.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { listenToRelevantRequests } from "../middleware/firestore/requests/index.js";
import { getUserRole } from "../middleware/firestore/users/index.js";
import { getCurrentUser } from "../middleware/auth/index.js";

function RequestsPageTable() {
  const [uid, setUid] = useState(null);
  const [userType, setUserType] = useState(null);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUser();
      const userRole = currentUser.uid
        ? await getUserRole(currentUser.uid)
        : null;
      currentUser.uid && setUid(currentUser.uid);
      userRole && setUserType(userRole);
      if (!currentUser.uid || !userRole) return;
      listenToRelevantRequests(currentUser.uid, userRole, setRows);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <div id="requests-page-content">
        {isLoading ? (
          <p>Loading...</p>
        ) : rows.length === 0 ? (
          <div className="no-data-text">אין היסטוריית בקשות</div>
        ) : (
          <TableContainer id="requests-table" component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" width="6%">
                    תאריך
                  </TableCell>
                  <TableCell align="right" width="12%">
                    סוג תקלה
                  </TableCell>
                  <TableCell align="right" width="12%">
                    שם מתנדב
                  </TableCell>
                  <TableCell align="right">תיאור</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.date}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.problem}</TableCell>
                    <TableCell align="right">{row.volName}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}

export default RequestsPageTable;
