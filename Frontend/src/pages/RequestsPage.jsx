import "../styles/RequestsPage.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";

function createData(date, problem, volname, description) {
  return { date, problem, volname, description };
}

const rows = [
  createData("2.7.23", "סיוע בכבלים", "משה כהן", "סיוע בכבלים"),
  createData("7.7.23", "החלפת גלגל", "משה כהן", "החלפת גלגל"),
  createData("15.7.23", "חילוץ ופתיחת רכב", "משה כהן", "חילוץ ופתיחת רכב"),
  createData("23.7.23", "החלפת גלגל", "משה כהן", "החלפת גלגל"),
  createData("2.8.23", "סיוע בכבלים", "משה כהן", "סיוע בכבלים"),
  createData("14.8.23", "חילוץ ופתיחת רכב", "משה כהן", "חילוץ ופתיחת רכב"),
  createData("1.9.23", "סיוע בכבלים", "משה כהן", "סיוע בכבלים"),
  createData("14.9.23", "החלפת גלגל", "משה כהן", "החלפת גלגל"),
  createData("23.11.23", "חילוץ ממעלית", "משה כהן", "חילוץ ממעלית"),
  createData("12.12.23", "סיוע בכבלים", "משה כהן", "סיוע בכבלים"),
  createData("1.1.24", "חילוץ ופתיחת רכב", "משה כהן", "חילוץ ופתיחת רכב"),
  createData("10.1.24", "חילוץ ממעלית", "משה כהן", "חילוץ ממעלית"),
  createData("22.1.24", "דלק שמן ומים", "משה כהן", "דלק שמן ומים"),
];

function RequestsPage() {
  return (
    <>
      <div id="title-container">
        <h1 id="title" style={{ color: "#ffa70f" }}>
          היסטוריית בקשות
        </h1>
        {/* <MenuIcon style={{ color: '#ffa70f', fontSize: 40, marginLeft: '1000px' }} /> */}
        <Button
          variant="contained"
          // className="left-aligned-button"
          id="open-new-request-button"
        >
          פתיחת בקשה חדשה
        </Button>
      </div>
      <div id="requests-page-content">
        <TableContainer id="requests-table" component={Paper}>
          <Table aria-label="simple table">
            {/* , maxWidth:300  */}
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
                  <TableCell align="right">{row.volname}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default RequestsPage;
