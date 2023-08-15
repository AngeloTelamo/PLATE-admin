import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ListTable = () => {
  const rows = [
    {
      id: 1453,
      customer: "Jm",
      date: "August 3",
      amount: 80,
      quality: 2,
      method: "Pick Up",
      reservedTime: "12:00",
      status: "Approved",
    },
    {
      id: 12342,
      customer: "Jm",
      date: "August 2",
      amount: 100,
      quality: 6,
      method: "Pick Up",
      reservedTime: "12:00",
      status: "Cancel",
    },
    {
      id: 34536,
      customer: "Jm",
      date: "August 3",
      amount: 20,
      quality: 2,
      method: "Pick Up",
      reservedTime: "12:00",
      status: "Pending",
    },
  ];

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCells">ID</TableCell>
            <TableCell className="tableCells">Customer</TableCell>
            <TableCell className="tableCells">Date</TableCell>
            <TableCell className="tableCells">Amount</TableCell>
            <TableCell className="tableCells">Quality</TableCell>
            <TableCell className="tableCells">Method</TableCell>
            <TableCell className="tableCells">Status</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell className="tabelCells">{row.customer}</TableCell>
              <TableCell className="tabelCells">{row.date}</TableCell>
              <TableCell className="tabelCells">{row.amount}</TableCell>
              <TableCell className="tabelCells">{row.reservedTime}</TableCell>
              <TableCell className="tabelCells">{row.method}</TableCell>
              <TableCell className="tabelCells"><div className={`bgTable ${row.status}`}>
              <span className={`status ${row.status}`}>
              {row.status}
                </span></div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTable;
