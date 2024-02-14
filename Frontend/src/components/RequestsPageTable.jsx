import "../styles/RequestsPage.css";
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { listenToRelevantRequests } from "../middleware/firestore/requests/index.js";
import { getUserRole } from "../middleware/firestore/users/index.js";

function RequestsPageTable({ uid }) {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserRole(uid);
        if (!user) {
          throw new Error("Failed to get user role");
        }
        await listenToRelevantRequests(uid, user.userType, setRows);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="requests-page-content">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="error-text">{error}</div>
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
                <TableCell align="right">
                  תיאור
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.task}</TableCell>
                  <TableCell align="right">{row.volName}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default RequestsPageTable;
