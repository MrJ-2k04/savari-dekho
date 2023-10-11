import {
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const TableSkeleton = ({ columns = 5, rows = 5 }) => {
  return (
    <TableContainer sx={{ minWidth: 800 }}>
      <Table>
        <TableHead>
          <TableRow>
            {[...Array(columns).keys()].map((key) => {
              return (
                <TableCell key={key} align={"center"} sortDirection={false}>
                  <Skeleton
                    animation="wave"
                    sx={{ backgroundColor: "lightgrey" }}
                    variant="text"
                    width={`80%`}
                  />
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(rows).keys()].map((key) => {
            return (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    <Skeleton animation="wave" variant="text" width={`80%`} />
                  </Stack>
                </TableCell>
                {[...Array(columns - 1).keys()].map((key) => {
                  return (
                    <TableCell key={key} align="left">
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={`${Math.random() * 50 + 50}%`}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell align="right" colSpan={columns + 1}>
              <Stack direction={"row-reverse"}>
                <Skeleton animation="wave" variant="text" width={`50%`} />
              </Stack>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { TableSkeleton };

