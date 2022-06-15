import  React, {useEffect} from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

 
function createData (id, masa, ofisant, statuss, cemMebleg, sonlanmatarixi, yemekler) {
  return {
    id,
    masa,
    ofisant,
    statuss,
    cemMebleg,
    sonlanmatarixi,
    yemekler,
  };
}

function Row(props) {
  const {row} = props;
  const [open, setOpen] = React.useState(false);

 
 
  return (
    <React.Fragment>
       <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.masa}</TableCell>
        <TableCell align="right">{row.ofisant}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.cemMebleg}</TableCell>
        <TableCell align="center">
     
          <Link style={{"textDecoration":"none"}} to={"edit/"+row.id}>
          <Button color="warning" variant="contained" size="small">
            Edit
          </Button>
          </Link>   
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Ad</TableCell>
                    <TableCell>Miqdar</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.yemekler.map((yemek)=> (
                    <TableRow key={yemek.id}>
                      <TableCell component="th" scope="row">
                        {yemek.adi}
                      </TableCell>
                      <TableCell>{yemek.miqdari}</TableCell>
                      <TableCell align="right">{yemek.butunMebleg}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

 
 

export default function CollapsibleTable () {
  const rows = useSelector(state => state.reducer)
  const wholePrice=rows.reduce(
    (previousValue, currentValue) => previousValue + currentValue.cemMebleg,
    0
  )
  return (
    <div className="container bodyy">
    <TableContainer component={Paper}>
      <Table className="container" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell align="right">Masa</TableCell>
            <TableCell align="right">Ofisant</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Qiymet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <div className="totalPrice">
      <h1>Cəmi məbləğ: {wholePrice} </h1>

      </div>

    </div>
  );
}
