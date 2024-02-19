import "../styles/RequestsPage.css";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Snackbar,
  TableRow,
  Paper,
  Button,
  Alert,
} from "@mui/material";
import {
  listenToRelevantRequests,
  deleteRequest,
} from "../middleware/firestore/requests/index.js";
import TableActionsDialog from "./RequestPageTableActions.jsx";
import { readFirestoreDocument } from "../middleware/firestore/index.js";
import { getAuth } from 'firebase/auth';

function RequestsPageTable() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteResult, setDeleteResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const UID = auth.currentUser.uid;
        const user = await readFirestoreDocument("users", UID)
        if (!user) {
          throw new Error("Failed to get user role");
        }
        await listenToRelevantRequests(UID, user.userType, setRows);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteRequest = async (taskId) => {
    try {
      const result = await deleteRequest(taskId);
      if (result === "התקלה נמחקה בהצלחה") {
        setDeleteResult({ success: true, message: result });
      } else {
        setDeleteResult({ success: false, message: result });
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      // Handle error accordingly
    }
  };

  function getStatusBackgroundColor(status) {
    switch (status) {
      case "מחכה לסיוע":
        return "#FFEB3B"; // Yellow
      case "בטיפול":
        return "#95F59C"; // Green
      default:
        return "#FFFFFF"; // Default white
    }
  }

  function isActiveTask(status) {
    return status === "מחכה לסיוע";
  }

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
                <TableCell align="right" width="10%">
                  סוג תקלה
                </TableCell>
                <TableCell align="right" width="10%">
                  סטטוס
                </TableCell>
                <TableCell align="right" width="17%">
                  תיאור
                </TableCell>
                <TableCell align="right" width="20%">
                  פירוט נוסף
                </TableCell>
                <TableCell align="right" width="10%">
                  שם מתנדב
                </TableCell>
                <TableCell align="right" width="10%">
                  טלפון ליצירת קשר
                </TableCell>
                <TableCell align="right">פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.task}</TableCell>
                  <TableCell
                    align="right"
                    style={{
                      backgroundColor: getStatusBackgroundColor(row.status),
                    }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.extraDetails}</TableCell>
                  <TableCell align="right">{row.volName}</TableCell>
                  <TableCell align="right">{row.volPhone}</TableCell>
                  <TableCell align="right">
                    <TableActionsDialog
                      uid={row.TaskId}
                      handleDeleteRequest={handleDeleteRequest}
                      isActiveTask={isActiveTask}
                      status={row.status}
                      volLocation={row.volLocation}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Snackbar to display delete result */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={deleteResult !== null}
        autoHideDuration={5000}
        onClose={() => setDeleteResult(null)}
      >
        <Alert
          onClose={() => setDeleteResult(null)}
          severity={deleteResult?.success ? "success" : "error"}
        >
          <div style={{ marginRight: "10px", marginLeft: "10px" }}>
            {deleteResult?.message}
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
}

export default RequestsPageTable;
