import { ContentCopy } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import moment from "moment";
import * as React from "react";
import { KeyPairSetup } from "../controllers/settings/setup";
import { maskMiddleStrings, maskPrivateKey } from "../utils/strings";

function Row(props: { row: KeyPairSetup }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [pubkeyCopied, setpubKeyCopied] = React.useState(false);
  const [privKeyCopied, setPrivKeyCopied] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, height: 25 }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component='th'
          scope='row'
          sx={{
            wordBreak: "break-word",
          }}>
          {row.alias === "" ? maskMiddleStrings(row.publicKey, 16) : row.alias}
        </TableCell>
        <TableCell align='right'>
          {moment(row.dateCreated as Date).format("lll")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Key Pair
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Public Key</TableCell>
                    <TableCell>Private Key</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.publicKey}>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{
                        wordBreak: "break-word",
                      }}>
                      {maskMiddleStrings(row.publicKey, 16)}

                      <IconButton
                        size='small'
                        color='secondary'
                        disabled={pubkeyCopied}
                        onClick={() => {
                          setpubKeyCopied(true);
                          navigator.clipboard.writeText(row.publicKey);
                          setTimeout(() => {
                            setpubKeyCopied(false);
                          }, 500);
                        }}>
                        <ContentCopy />
                      </IconButton>
                      {pubkeyCopied && "COPIED"}
                    </TableCell>
                    <TableCell
                      sx={{
                        wordBreak: "break-word",
                      }}>
                      {maskMiddleStrings(maskPrivateKey(row.privateKey), 16)}

                      <IconButton
                        size='small'
                        color='secondary'
                        disabled={privKeyCopied}
                        onClick={() => {
                          setPrivKeyCopied(true);
                          navigator.clipboard.writeText(row.privateKey);
                          setTimeout(() => {
                            setPrivKeyCopied(false);
                          }, 500);
                        }}>
                        <ContentCopy />
                      </IconButton>
                      {privKeyCopied && "COPIED"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: "3px 8px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function CollapsibleTable({ data }: { data: KeyPairSetup[] }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table' size='small'>
        <TableHead>
          <TableRow
            sx={{
              height: 33,
            }}>
            <StyledTableCell />
            <StyledTableCell>Alias</StyledTableCell>
            <StyledTableCell align='right'>Date Created</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d: KeyPairSetup) => (
            <Row key={d.publicKey} row={d} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
